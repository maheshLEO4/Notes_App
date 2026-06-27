from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session

import models
import schemas
from database import engine
from auth import (
    get_db,
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Create tables
models.Base.metadata.create_all(bind=engine)

auth_app = FastAPI()


# Signup API
@auth_app.post("/signup")
def signup(
    user: schemas.Signup,
    db: Session = Depends(get_db)
):
    existing_user = db.query(
        models.Users
    ).filter(
        models.Users.email == user.email
    ).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }

    new_user = models.Users(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User signup successful"
    }


# Login API
@auth_app.post("/login")
def login(
    user: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = db.query(models.Users).filter(
        models.Users.email == user.username
    ).first()

    if not db_user or not verify_password(
        user.password,
        db_user.password
    ):
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(
        {"user_id": db_user.id}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
# Logout API
@auth_app.post("/logout")
def logout(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    # Add token to blacklist
    blacklist_entry = models.TokenBlacklist(token=token)
    db.add(blacklist_entry)
    db.commit()
    return {"message": "Logout successful"}


# Home Route
@auth_app.get("/")
def home(
    db: Session = Depends(get_db)
):
    users = db.query(
        models.Users
    ).all()

    return {
        "message": "Welcome to the FastAPI Authentication System",
        "users": [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
            for user in users
        ]
    }


# Protected Profile Route
@auth_app.get("/profile")
def profile(
    user: models.Users = Depends(get_current_user)
):
    if not user:
        return {
            "message": "Invalid token"
        }

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,        
        "notes": [
            {
                "id": note.id,
                "title": note.title,
                "status": note.status,
                "content": note.content
            }
            for note in user.notes
        ]           
    }