# Backend — FastAPI + RAG Chatbot

## 1. Install dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## 2. Set up Ollama (for the AI chatbot)

1. Install Ollama: https://ollama.com/download
2. Pull the two models the chatbot needs:
   ```bash
   ollama pull llama3.1:8b
   ollama pull nomic-embed-text
   ```
3. Make sure Ollama is running (it usually starts automatically, or run `ollama serve`).

The backend talks to Ollama at `http://localhost:11434` by default — change
`OLLAMA_BASE_URL` in `.env` if yours runs elsewhere.

## 3. Run the server

```bash
uvicorn main:app --reload --port 8000
```

The API is now live at `http://localhost:8000`. Interactive docs: `http://localhost:8000/docs`.

On startup, the app embeds every line in `data/portfolio_knowledge.txt` using
`nomic-embed-text` and keeps the vectors in memory (see
`services/retrieval.py`). If Ollama isn't running yet, the server still
starts — the chatbot just returns a friendly fallback message until Ollama
is available.

## Endpoints

| Method | Path          | Purpose                                  |
|--------|---------------|-------------------------------------------|
| POST   | `/api/chat`   | Send `{ "message": "..." }`, get `{ "reply": "..." }` |
| POST   | `/api/contact`| Contact form submission                   |
| GET    | `/api/health` | Health check + RAG index status           |

## Project structure

```
backend/
├── main.py                    # FastAPI app, CORS, startup hook
├── config.py                  # Settings loaded from .env
├── routes/
│   ├── chat.py                # POST /api/chat
│   └── contact.py             # POST /api/contact
├── services/
│   ├── chatbot.py             # RAG pipeline: retrieve + prompt Llama 3.1 8B
│   ├── embeddings.py          # Wraps Ollama's nomic-embed-text
│   └── retrieval.py           # In-memory vector index + cosine similarity search
├── data/
│   └── portfolio_knowledge.txt  # Add new facts about Aditya here, one per line
├── requirements.txt
└── .env.example
```

## Adding to the knowledge base

Open `data/portfolio_knowledge.txt` and add a new line describing the fact
(one self-contained idea per line — new projects, new skills, updated
education, etc.). Restart the server to re-index; no code changes needed.

## Connecting an email service later

`routes/contact.py` currently logs form submissions server-side. To actually
send emails, add a provider SDK (e.g. Resend, SendGrid, or `smtplib`), store
the API key in `.env`, and call it inside `submit_contact()`. Never put API
keys in the frontend.
