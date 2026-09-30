"""Thin wrapper around Ollama's embeddings endpoint (nomic-embed-text)."""
import httpx
from config import settings


async def embed_text(text: str) -> list[float]:
    """Return an embedding vector for a single piece of text."""
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"{settings.ollama_base_url}/api/embeddings",
            json={"model": settings.embed_model, "prompt": text},
        )
        response.raise_for_status()
        data = response.json()
        return data["embedding"]


async def embed_batch(texts: list[str]) -> list[list[float]]:
    """Embed a list of texts sequentially. Ollama's embeddings endpoint is
    single-prompt, so we call it once per chunk. This only runs at startup
    (or when the knowledge base changes), so it doesn't need to be fast."""
    vectors = []
    for text in texts:
        vectors.append(await embed_text(text))
    return vectors
