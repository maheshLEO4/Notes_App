from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth_routes import auth_app
from notes_routes import notes_app

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/auth", auth_app)
app.mount("/notes", notes_app)

