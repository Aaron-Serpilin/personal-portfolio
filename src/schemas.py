from pydantic import BaseModel, Field
from typing import Optional


class ChatRequest(BaseModel):

    """
    Request model for the chat endpoint.
    """

    session_id: str = Field(
        ...,
        description="Unique session identifier for conversation continuity",
        min_length=1,
        max_length=100
    )
    user_message: str = Field(
        ...,
        description="The user's message to the chatbot",
        min_length=1,
        max_length=500
    )


class ChatResponse(BaseModel):
    
    """
    Response model for the chat endpoint.
    """

    assistant_message: str = Field(
        ...,
        description="The assistant's response message"
    )
    rate_limited: bool = Field(
        default=False,
        description="Flag indicating if the user is approaching rate limits"
    )


class ErrorResponse(BaseModel):

    """
    Standard error response model.
    """

    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Additional error details")