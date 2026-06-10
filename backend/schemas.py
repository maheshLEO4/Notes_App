from pydantic import BaseModel, EmailStr, Field
from sympy import content


class Signup(BaseModel):

    name: str = Field(
        ...,
        min_length=4,
        max_length=100
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=6,
        max_length=50
    )


class Login(BaseModel):

    email: EmailStr

    password: str = Field(
        ...,
        min_length=6,
        max_length=50
    )



class TokenResponse(BaseModel):

    message: str
    access_token: str
    token_type: str 



class NoteCreate(BaseModel):
    title: str = Field(
        ...,
        example="Meeting Notes",
        min_length=1,
        max_length=100
    )
    status: str = Field(
        ...,
        example="Pending"
    )
    content: str = Field(
        ...,
        example="Discuss project milestones and deadlines.",
        min_length=1
    )
    
class NoteUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        example="Meeting Notes",
        min_length=1,
        max_length=100
    )
    status: str | None = Field(
        default=None,
        example="Pending"
    )
    content: str | None     = Field(
        default=None,
        example="Discuss project milestones and deadlines.",
        min_length=1
    )   

class NoteResponse(BaseModel):
    id: int
    title: str
    status: str
    content: str

    class Config:
        from_attributes = True


class Profile(BaseModel):
    id: int
    name: str
    email: EmailStr
    notes: list[NoteResponse] = []

    class Config:
        from_attributes = True  
