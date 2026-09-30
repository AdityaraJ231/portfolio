"""In-memory semantic retrieval over the portfolio knowledge base.

For a personal portfolio, the knowledge base is small (a few dozen chunks at
most), so a lightweight in-memory vector store is enough — no external
vector database required. The index is built once at startup and reused for
every chat request.
"""
from pathlib import Path

import numpy as np

from services.embeddings import embed_batch, embed_text

KNOWLEDGE_BASE_PATH = Path(__file__).resolve().parent.parent / "data" / "portfolio_knowledge.txt"


class RetrievalIndex:
    def __init__(self):
        self.chunks: list[str] = []
        self.vectors: np.ndarray | None = None
        self.ready = False

    def _load_chunks(self) -> list[str]:
        raw = KNOWLEDGE_BASE_PATH.read_text(encoding="utf-8")
        chunks = []
        for line in raw.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            chunks.append(line)
        return chunks

    async def build(self):
        """Embed every knowledge-base chunk and cache the vectors in memory."""
        self.chunks = self._load_chunks()
        try:
            embeddings = await embed_batch(self.chunks)
            self.vectors = np.array(embeddings, dtype=np.float32)
            self.ready = True
        except Exception:
            # Ollama not running yet, or model not pulled. The chatbot route
            # falls back gracefully — see services/chatbot.py.
            self.ready = False

    async def search(self, query: str, top_k: int = 4) -> list[str]:
        """Return the top_k most relevant knowledge-base chunks for a query."""
        if not self.ready or self.vectors is None or len(self.chunks) == 0:
            return []

        query_vec = np.array(await embed_text(query), dtype=np.float32)

        # Cosine similarity between the query vector and every chunk vector.
        norms = np.linalg.norm(self.vectors, axis=1) * np.linalg.norm(query_vec)
        norms[norms == 0] = 1e-8
        scores = self.vectors @ query_vec / norms

        top_indices = np.argsort(scores)[::-1][:top_k]
        return [self.chunks[i] for i in top_indices]


# Single shared index instance, built once on FastAPI startup.
retrieval_index = RetrievalIndex()
