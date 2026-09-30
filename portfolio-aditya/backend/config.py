from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ollama_base_url: str = "http://localhost:11434"
    chat_model: str = "llama3.1:8b"
    embed_model: str = "nomic-embed-text"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    contact_email_to: str = "aditya.raj.placeholder@example.com"

    class Config:
        env_file = ".env"


settings = Settings()
