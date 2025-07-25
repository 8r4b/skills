from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from utils.skill_extractor import extract_skills_and_feedback_from_text
from utils.file_reader import read_resume  # Import your file reader function
from auth import get_current_user
from database import get_db
from sqlalchemy.orm import Session
from crud import create_resume

router = APIRouter()

@router.post("/upload-resume/")
async def upload_resume(
    file: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
        # Check if the user's email is verified
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified. Please verify your email to use this service.")

    text = await read_resume(file)
    if not text:
        raise HTTPException(status_code=400, detail="Unsupported file or empty content")

    skills, feedback = extract_skills_and_feedback_from_text(text)

    # Ensure skills are properly formatted
    formatted_skills = ", ".join(skills)

    # Store resume data in the database
    resume = create_resume(db, filename=file.filename, skills=formatted_skills, user_id=user.id)
    resume.feedback = feedback
    db.commit()

    return {"filename": file.filename, "skills": skills, "feedback": feedback}
