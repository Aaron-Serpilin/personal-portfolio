import os
from dotenv import load_dotenv
import logging
from fastapi import FastAPI
from fastapi import HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# Create a logger instance
logger = logging.getLogger(__name__)

load_dotenv()

GCP_CRED_64 = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_BASE64")
GC_BUCKET_NAME=os.environ.get("GC_BUCKET_NAME")
GC_PREFIX = os.environ.get("GC_PREFIX")
GC_PROJECT_ID=os.getenv("GC_PROJECT_ID")

app = FastAPI()
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
    return {"Message": "Welcome to Aaron Serpilin's Personal Portfolio"}

