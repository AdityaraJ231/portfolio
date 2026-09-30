"""RAG pipeline: retrieve relevant portfolio chunks, then ask Llama 3.1 8B
(via Ollama) to answer using only that context."""
import httpx

from config import settings
from services.retrieval import retrieval_index

SYSTEM_PROMPT = """You are the AI assistant embedded in Aditya Raj's personal portfolio website.
Answer questions about Aditya's skills, projects, education, and contact details using ONLY the
context provided below. If the answer isn't in the context, say you don't have that information
and suggest the visitor use the contact form. Keep answers concise (2-4 sentences), friendly, and
in first person plural ("Aditya's skills include...") — never invent facts, experience, or
achievements that aren't in the context."""

FALLBACK_REPLY = (
    "I can't reach the local AI model right now. Make sure Ollama is running and the "
    "llama3.1:8b and nomic-embed-text models are pulled (see backend/README.md). "
    "In the meantime, feel free to use the contact form below!"
)


async def generate_reply(user_message: str) -> str:
    context_chunks = await retrieval_index.search(user_message, top_k=4)
    context = "\n".join(f"- {c}" for c in context_chunks) or "No matching context found."

    prompt = (
        f"{SYSTEM_PROMPT}\n\n"
        f"Context:\n{context}\n\n"
        f"Visitor question: {user_message}\n\n"
        f"Answer:"
    )

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{settings.ollama_base_url}/api/generate",
                json={
                    "model": settings.chat_model,
                    "prompt": prompt,
                    "stream": False,
                },
            )
            response.raise_for_status()
            data = response.json()
            return data.get("response", "").strip() or FALLBACK_REPLY
    except Exception:
        return FALLBACK_REPLY
