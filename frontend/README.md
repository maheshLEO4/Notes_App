# Notely — React Frontend

React + Vite + Tailwind CSS frontend for the FastAPI notes backend.

## Setup

```bash
npm install
```

Copy the env file and point it at your backend:

```bash
cp .env.example .env
# Edit VITE_API_URL if your backend isn't on localhost:8000
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project structure

```
src/
  api/index.js          # All API calls (matches backend routes exactly)
  context/AuthContext.jsx
  pages/
    Login.jsx
    Signup.jsx
    Dashboard.jsx
  components/
    NoteCard.jsx
    NoteModal.jsx
```

## API mapping

| Frontend action | Backend route |
|---|---|
| Login | POST /auth/login (OAuth2 form) |
| Signup | POST /auth/signup |
| Logout | POST /auth/logout |
| Get profile | GET /auth/profile |
| List notes | GET /notes/ |
| Create note | POST /notes/notes |
| Update note | PUT /notes/notes/:id |
| Delete note | DELETE /notes/notes/:id |

## CORS

Make sure your FastAPI backend allows `http://localhost:5173` (Vite's default port).
Add to `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
