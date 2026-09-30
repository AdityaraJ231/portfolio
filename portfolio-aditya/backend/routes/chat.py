from fastapi import APIRouter
from pydantic import BaseModel, Field

from services.chatbot import generate_reply

router = APIRouter(prefix="/api", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    reply = await generate_reply(payload.message)
    return ChatResponse(reply=reply)
