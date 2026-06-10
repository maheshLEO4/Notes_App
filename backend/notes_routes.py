from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import schemas
from auth import get_current_user, get_db

notes_app = FastAPI()


@notes_app.get("/")
def get_notes(
    user: models.Users = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    notes = db.query(models.NOTE).filter(models.NOTE.user_id == user.id).all()
    return notes


@notes_app.post("/notes")
def create_note(
    note: schemas.NoteCreate, 
    user: models.Users = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    new_note = models.NOTE(
        title=note.title,
        status=note.status,
        content=note.content,
        user_id=user.id
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note 


@notes_app.put("/notes/{note_id}")
def update_note(
    note_id: int, 
    note: schemas.NoteUpdate, 
    user: models.Users = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    db_note = db.query(models.NOTE).filter(
        models.NOTE.id == note_id, 
        models.NOTE.user_id == user.id
    ).first()
    
    if not db_note:
        return {
            "message": "Note not found"
        }
        
    if note.title is not None:
        db_note.title = note.title
    if note.status is not None:
        db_note.status = note.status
    if note.content is not None:
        db_note.content = note.content
        
    db.commit()
    db.refresh(db_note)
    return db_note


@notes_app.delete("/notes/{note_id}")
def delete_note(
    note_id: int, 
    user: models.Users = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    db_note = db.query(models.NOTE).filter(
        models.NOTE.id == note_id, 
        models.NOTE.user_id == user.id
    ).first()
    
    if not db_note:
        return {
            "message": "Note not found"
        }
        
    db.delete(db_note)
    db.commit()
    return {
        "message": "Note deleted successfully"
    }


@notes_app.get("/profile")
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

@notes_app.get("/notes/{note_id}")
def get_note(
    note_id: int, 
    user: models.Users = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    db_note = db.query(models.NOTE).filter(
        models.NOTE.id == note_id, 
        models.NOTE.user_id == user.id
    ).first()
    
    if not db_note:
        return {
            "message": "Note not found"
        }
    return db_note