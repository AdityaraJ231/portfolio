import logging

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr, Field

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger("contact")


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=150)
    message: str = Field(..., min_length=1, max_length=2000)


class ContactResponse(BaseModel):
    success: bool
    detail: str


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest):
    """Receives contact form submissions.

    Currently just logs the message server-side. To actually deliver these
    emails, plug in a provider (e.g. Resend, SendGrid, SMTP) here — keep the
    API key in `.env`, never in frontend code.
    """
    logger.info(
        "New contact submission from %s <%s> — subject: %s",
        payload.name,
        payload.email,
        payload.subject,
    )
    return ContactResponse(success=True, detail="Message received. Aditya will get back to you soon.")
