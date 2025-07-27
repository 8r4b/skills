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
    try:
        # Check if the user's email is verified
        if not user.is_verified:
            raise HTTPException(status_code=403, detail="Email not verified. Please verify your email to use this service.")

        # Read the uploaded file
        try:
            text = await read_resume(file)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")

        if not text:
            raise HTTPException(status_code=400, detail="Unsupported file or empty content")

        # Extract skills and feedback
        skills, feedback = extract_skills_and_feedback_from_text(text)
        print(f"Extracted skills: {skills}")  # Debug log
        print(f"Extracted feedback: {feedback}")  # Debug log

        # Ensure skills are properly formatted
        formatted_skills = ", ".join(skills)

        # Store resume data in the database
        resume = create_resume(db, filename=file.filename, skills=formatted_skills, user_id=user.id)
        resume.feedback = feedback
        db.commit()

        return {"filename": file.filename, "skills": skills, "feedback": feedback}
    except Exception as e:
        print(f"Error during resume upload: {e}")  # Debug log
        raise HTTPException(status_code=500, detail="Internal Server Error")
