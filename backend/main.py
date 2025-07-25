from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from user_routes import router as user_router
from resume_routes import router as resume_router
import create_tables

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables.create_tables()  # Creates tables on startup (optional)

app.include_router(user_router)
app.include_router(resume_router)
