import os
import time
import logging
from collections import defaultdict
from typing import Dict, Tuple
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from schemas import ChatRequest, ChatResponse, ErrorResponse
from chatbot import get_chatbot_pipeline

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# Create a logger instance
logger = logging.getLogger(__name__)

load_dotenv()

# Environment variables
API_KEY = os.environ.get("API_KEY") 
GCP_CRED_64 = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_BASE64")
GC_BUCKET_NAME = os.environ.get("GC_BUCKET_NAME")
GC_PREFIX = os.environ.get("GC_PREFIX")
GC_PROJECT_ID = os.getenv("GC_PROJECT_ID")

# Directory for portfolio documents
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

# Rate Limiter to prevent a bot or someone spamming my API_KEY

class RateLimiter:

    """
    Simple in-memory rate limiter with IP-based tracking.
    Supports X-Forwarded-For header for proxy environments.
    """
    
    def __init__(
        self,
        requests_per_minute: int = 30,
        burst_limit: int = 5,
        burst_window_seconds: int = 10
    ):
        self.requests_per_minute = requests_per_minute
        self.burst_limit = burst_limit
        self.burst_window = burst_window_seconds
        
        # Track requests: {ip: [(timestamp, ...),]}
        self._requests: Dict[str, list] = defaultdict(list)
        # Track rapid-fire detection: {ip: [timestamps]}
        self._burst_tracker: Dict[str, list] = defaultdict(list)
    
    def _clean_old_requests(self, ip: str, current_time: float):

        """
        Remove requests older than 1 minute.
        """

        cutoff = current_time - 60
        self._requests[ip] = [t for t in self._requests[ip] if t > cutoff]
        
        # Clean burst tracker
        burst_cutoff = current_time - self.burst_window
        self._burst_tracker[ip] = [t for t in self._burst_tracker[ip] if t > burst_cutoff]
    
    def check_rate_limit(self, ip: str) -> Tuple[bool, bool, str]:

        """
        Check if request should be allowed.
        
        Returns:
            Tuple of (allowed, is_warning, message)
        """
        current_time = time.time()
        self._clean_old_requests(ip, current_time)
        
        # Check burst limit (rapid-fire protection)
        if len(self._burst_tracker[ip]) >= self.burst_limit:
            return False, False, "Too many requests in quick succession. Please slow down."
        
        # Check per-minute limit
        if len(self._requests[ip]) >= self.requests_per_minute:
            return False, False, "Rate limit exceeded. Please wait a moment before trying again."
        
        # Record this request
        self._requests[ip].append(current_time)
        self._burst_tracker[ip].append(current_time)
        
        # Check if approaching limit (80% threshold)
        is_warning = len(self._requests[ip]) >= int(self.requests_per_minute * 0.8)
        
        return True, is_warning, ""
    
    def get_client_ip(self, request: Request) -> str:

        """
        Extract client IP, respecting X-Forwarded-For header.
        """

        # Check for proxy headers
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            # Take the first IP in the chain (original client)
            return forwarded_for.split(",")[0].strip()
        
        # Fallback to direct connection
        return request.client.host if request.client else "unknown"


# Initialize rate limiter
rate_limiter = RateLimiter(
    requests_per_minute=30,
    burst_limit=5,
    burst_window_seconds=10
)

# Initialization

app = FastAPI(
    title="Aaron Serpilin Portfolio API",
    description="Backend API for Aaron's personal portfolio AI chatbot",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoints

@app.get("/")
async def main():
    """Welcome endpoint."""
    return {"Message": "Welcome to Aaron Serpilin's Personal Portfolio"}


@app.post(
    "/chat",
    response_model=ChatResponse,
    responses={
        429: {"model": ErrorResponse, "description": "Rate limit exceeded"},
        500: {"model": ErrorResponse, "description": "Internal server error"}
    }
)

async def chat(request: Request, chat_request: ChatRequest):

    """
    Chat endpoint for the portfolio AI assistant.
    
    Uses RAG to answer questions about Aaron based on portfolio documents.
    Rate limited to prevent abuse.
    """

    # Get client IP for rate limiting
    client_ip = rate_limiter.get_client_ip(request)
    
    # Check rate limit
    allowed, is_warning, error_message = rate_limiter.check_rate_limit(client_ip)
    
    if not allowed:
        logger.warning(f"Rate limit exceeded for IP: {client_ip}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=error_message
        )
    
    # Validate API key
    if not API_KEY:
        logger.error("API_KEY environment variable not set")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server configuration error. Please try again later."
        )
    
    try:
        # Get the chatbot pipeline
        pipeline = get_chatbot_pipeline(API_KEY, DATA_DIR)
        
        # Process the message
        response_text = pipeline.chat(
            session_id=chat_request.session_id,
            user_message=chat_request.user_message
        )
        
        logger.info(f"Chat response generated for session: {chat_request.session_id[:20]}...")
        
        return ChatResponse(
            assistant_message=response_text,
            rate_limited=is_warning
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your message. Please try again."
        )

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}