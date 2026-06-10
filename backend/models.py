from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    email = Column(
        String,
        unique=True,
        index=True
    )

    password = Column(String)

    # Relationship
    notes = relationship(
        "NOTE",
        back_populates="user",
        cascade="all, delete-orphan"
    )


class NOTE(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    status = Column(String)
    content = Column(String)

    # Foreign Key
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Relationship
    user = relationship(
        "Users",
        back_populates="notes"
    )


class TokenBlacklist(Base):
    __tablename__ = "token_blacklist"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True)
    blacklisted_on = Column(DateTime, default=datetime.utcnow)