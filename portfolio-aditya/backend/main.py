from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from routes import chat, contact
from services.retrieval import retrieval_index


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Build the RAG vector index once on startup (requires Ollama running
    # with the nomic-embed-text model pulled). If it fails, the chat route
    # still works and returns a friendly fallback message.
    await retrieval_index.build()
    yield


app = FastAPI(
    title="Aditya Raj Portfolio API",
    description="Backend for the portfolio website — contact form + RAG-powered AI chatbot.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(contact.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "rag_index_ready": retrieval_index.ready}
