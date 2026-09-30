# Aditya Raj — Personal Portfolio

A dark-themed, data-science-focused portfolio with a React/Vite frontend and
a FastAPI backend powering an AI chatbot (Llama 3.1 8B + RAG, served locally
through Ollama).

```
portfolio-aditya/
├── frontend/       React + Vite + Tailwind CSS
└── backend/        FastAPI + RAG chatbot + contact API
```

## Quick start

### 1. Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. Requests to `/api/*` are proxied to the
backend at `http://localhost:8000` (see `frontend/vite.config.js`), so run
both servers while developing.

### 2. Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

The AI chatbot needs [Ollama](https://ollama.com) running locally with two
models pulled — see `backend/README.md` for the full setup (it takes about
five minutes). The rest of the site works fully without it.

## Where to customize

| What                          | Where                                              |
|--------------------------------|-----------------------------------------------------|
| Profile photo (hero)           | `frontend/src/assets/images/profile.jpg`             |
| About photo                    | `frontend/src/assets/images/about.jpg`               |
| GitHub / LinkedIn / Email links| Search each component for `adityaraj-placeholder` and `example.com`, replace with your real links |
| Add / edit projects            | `frontend/src/data/projects.js`                      |
| Add / edit blog posts          | `frontend/src/data/blogs.js`                          |
| Add / edit skills              | `frontend/src/data/skills.js`                         |
| Chatbot's knowledge            | `backend/data/portfolio_knowledge.txt`                |
| Resume download link           | Add a button in `frontend/src/components/About.jsx` pointing at a PDF in `frontend/src/assets/` |

All placeholder links (GitHub, LinkedIn, email) use `adityaraj-placeholder`
or `example.com` so they're easy to find and replace with a project-wide
search.

## Tech stack

**Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide React
**Backend:** Python, FastAPI, REST APIs
**AI Chatbot:** Llama 3.1 8B (via Ollama), RAG, nomic-embed-text embeddings

## Design notes

- Dark theme: near-black background, vivid red primary accent, purple/magenta
  secondary glow — tuned in `frontend/tailwind.config.js`.
- Typography: **Sora** for display/headings, **Inter** for body text.
- Motion is deliberately restrained: entrance animation on the hero, and
  hover/reveal transitions elsewhere — nothing scroll-jacked or excessive.

## Notes on content

All statistics, project descriptions, and skills reflect only what was
provided for this build — no fabricated internships, employers, or metrics
were added. Update `frontend/src/data/*.js` and
`backend/data/portfolio_knowledge.txt` together when you add anything new,
so the chatbot stays in sync with the visible site.
