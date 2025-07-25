from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_verified = Column(Boolean, default=False)
    verification_token = Column(String, nullable=True, index=True)  # for email verification
    password_reset_token = Column(String, nullable=True, index=True)  # for password reset

    resumes = relationship("Resume", back_populates="user")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    skills = Column(Text, nullable=True)  # Add this
    feedback = Column(Text, nullable=True)  # Added feedback column
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="resumes")
