# 📝 Modern Notes Application

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat\&logo=FastAPI\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat\&logo=postgresql\&logoColor=white)

A full-stack, responsive note-taking web application built with a modern tech stack. Securely store, manage, and organize your notes with user authentication and real-time interactions.

---

## ✨ Features

### 🔐 Authentication & Security

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing using Argon2
* Token Blacklisting (Logout Support)

### 📝 Notes Management

* Create Notes
* View Notes
* Update Notes
* Delete Notes
* User-Specific Notes Storage

### 🎨 Frontend Features

* Responsive Design
* Modern UI with Tailwind CSS
* Authentication Context API
* React Router Navigation
* API Integration Layer

### ⚡ Backend Features

* FastAPI REST API
* SQLAlchemy ORM
* PostgreSQL Database
* OAuth2 Authentication
* Swagger API Documentation

### 🚀 Deployment Ready

* Dockerized Backend
* Vercel Frontend Deployment
* Render/Railway Backend Deployment
* Managed PostgreSQL Support

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Context API
* Axios

### Backend

* FastAPI
* Python 3.12+
* SQLAlchemy
* PostgreSQL
* OAuth2
* JWT Authentication
* Passlib (Argon2)

### DevOps

* Docker
* Docker Compose
* GitHub
* Vercel
* Render / Railway

---

## 📂 Project Structure

```text
Notes_App/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── .env
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── auth_routes.py
│   ├── notes_routes.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js (v18+)
* Python (v3.12+)
* PostgreSQL
* Git
* Docker (Optional)

---

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/Notes_App.git

cd Notes_App
```

---

# 2️⃣ Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Create virtual environment:

### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

### Linux / macOS

```bash
python -m venv venv

source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env` file:

```env
DB_URL=postgresql://postgres:postgres@localhost:5432/notesdb

SECRET_KEY=your_super_secret_key

ALGORITHM=HS256
```

Run FastAPI server:

```bash
uvicorn main:app --reload
```

Backend will be available at:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

# 3️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Run development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:5173
```

---

## 🐳 Docker Setup

### Backend Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn","main:app","--host","0.0.0.0","--port","8000"]
```

---

### Docker Compose

```yaml
version: "3.9"

services:

  db:
    image: postgres:16

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: notesdb

    ports:
      - "5432:5432"

    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend

    ports:
      - "8000:8000"

    env_file:
      - ./backend/.env

    depends_on:
      - db

volumes:
  postgres_data:
```

Run containers:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| POST   | `/auth/signup`  | Register User    |
| POST   | `/auth/login`   | Login User       |
| POST   | `/auth/logout`  | Logout User      |
| GET    | `/auth/profile` | Get User Profile |

### Notes

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | `/notes/create` | Create Note   |
| GET    | `/notes/`       | Get All Notes |
| PUT    | `/notes/{id}`   | Update Note   |
| DELETE | `/notes/{id}`   | Delete Note   |

---

## ☁️ Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub.
2. Import repository into Vercel.
3. Configure environment variables:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

4. Deploy.

---

### Backend Deployment (Render)

1. Create a Render Web Service.
2. Connect GitHub repository.
3. Select Docker deployment.
4. Add environment variables:

```env
DB_URL=your_postgresql_connection_string

SECRET_KEY=your_secret_key

ALGORITHM=HS256
```

5. Deploy.

---

### PostgreSQL Hosting Options

* Render PostgreSQL
* Neon
* Supabase
* Railway PostgreSQL

---

## 🔒 Security Features

* JWT Authentication
* OAuth2 Password Flow
* Argon2 Password Hashing
* Token Expiration
* Token Blacklisting
* Protected API Routes
* Environment Variables for Secrets

---

## 📸 Screenshots

Add application screenshots here.

### Login Page

```text
screenshots/login.png
```

### Dashboard

```text
screenshots/dashboard.png
```

### Notes Page

```text
screenshots/notes.png
```

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Create Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Mahesh**

Built using React, FastAPI, PostgreSQL, Docker, and modern web development practices.
