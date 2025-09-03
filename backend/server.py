# Prasanth Davuluri Portfolio Backend Server
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict, Union
import os
from datetime import datetime, timezone
import uuid
import logging

# Import data
from data.prasanth_data import (
    DEFAULT_PROFILE, DEFAULT_SKILLS, DEFAULT_EXPERIENCE, 
    DEFAULT_PROJECTS, DEFAULT_TESTIMONIALS, DEFAULT_CERTIFICATIONS,
    DEFAULT_AWARDS, DEFAULT_STATS
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Prasanth Davuluri Portfolio API",
    description="Backend API for Prasanth Davuluri's Professional Portfolio",
    version="2.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DATABASE_NAME = "prasanth_portfolio"

client = None
db = None

# Pydantic Models
class ProfileModel(BaseModel):
    id: str
    name: str
    title: str
    email: str
    phone: str
    location: str
    linkedin: str
    github: str
    bio: str
    yearsExperience: int
    availability: str
    tagline: str
    summary: str

class SkillModel(BaseModel):
    name: str
    level: int
    category: str
    yearsExperience: int

class ExperienceModel(BaseModel):
    id: str
    company: str
    position: str
    location: str
    duration: str
    type: str
    client: Optional[str] = None
    description: str
    achievements: List[str]
    technologies: List[str]

class ProjectModel(BaseModel):
    id: str
    title: str
    category: str
    description: str
    longDescription: str
    technologies: List[str]
    features: List[str]
    status: str
    timeline: str
    client: str
    impact: str

class TestimonialModel(BaseModel):
    id: str
    name: str
    position: str
    company: str
    content: str
    rating: int
    date: str
    approved: bool

class CertificationModel(BaseModel):
    id: str
    title: str
    issuer: str
    date: str
    description: str
    category: str

class AwardModel(BaseModel):
    id: str
    title: str
    organization: str
    year: str
    description: str

class ContactModel(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    phone: Optional[str] = None
    company: Optional[str] = None

@app.on_event("startup")
async def startup_event():
    """Initialize database connection and seed data"""
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DATABASE_NAME]
        
        # Test connection
        await client.admin.command('ping')
        logger.info("Connected to MongoDB successfully")
        
        # Seed database with default data
        await seed_database()
        logger.info("Database seeded successfully")
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection"""
    if client:
        client.close()
        logger.info("MongoDB connection closed")

async def seed_database():
    """Seed database with default portfolio data"""
    try:
        # Check if data already exists
        existing_profile = await db.profile.find_one({"id": DEFAULT_PROFILE["id"]})
        if existing_profile:
            logger.info("Database already seeded, skipping...")
            return

        # Insert default data
        await db.profile.insert_one(DEFAULT_PROFILE)
        await db.skills.insert_many(DEFAULT_SKILLS)
        await db.experience.insert_many(DEFAULT_EXPERIENCE)
        await db.projects.insert_many(DEFAULT_PROJECTS)
        await db.testimonials.insert_many(DEFAULT_TESTIMONIALS)
        await db.certifications.insert_many(DEFAULT_CERTIFICATIONS)
        await db.awards.insert_many(DEFAULT_AWARDS)
        
        logger.info("Default data inserted successfully")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")

# API Endpoints

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await client.admin.command('ping')
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "service": "Prasanth Davuluri Portfolio API",
            "version": "2.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {str(e)}")

@app.get("/api/profile", response_model=ProfileModel)
async def get_profile():
    """Get profile information"""
    try:
        profile = await db.profile.find_one({"id": DEFAULT_PROFILE["id"]})
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Remove MongoDB _id field
        profile.pop('_id', None)
        return ProfileModel(**profile)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/skills", response_model=List[SkillModel])
async def get_skills():
    """Get all skills"""
    try:
        skills = await db.skills.find().to_list(length=None)
        # Remove MongoDB _id fields
        for skill in skills:
            skill.pop('_id', None)
        return [SkillModel(**skill) for skill in skills]
        
    except Exception as e:
        logger.error(f"Error fetching skills: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/experience", response_model=List[ExperienceModel])
async def get_experience():
    """Get work experience"""
    try:
        experience = await db.experience.find().sort("duration", -1).to_list(length=None)
        # Remove MongoDB _id fields
        for exp in experience:
            exp.pop('_id', None)
        return [ExperienceModel(**exp) for exp in experience]
        
    except Exception as e:
        logger.error(f"Error fetching experience: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/projects", response_model=List[ProjectModel])
async def get_projects(category: Optional[str] = None):
    """Get projects, optionally filtered by category"""
    try:
        query = {}
        if category:
            query["category"] = category
            
        projects = await db.projects.find(query).to_list(length=None)
        # Remove MongoDB _id fields
        for project in projects:
            project.pop('_id', None)
        return [ProjectModel(**project) for project in projects]
        
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/testimonials", response_model=List[TestimonialModel])
async def get_testimonials():
    """Get approved testimonials"""
    try:
        testimonials = await db.testimonials.find({"approved": True}).to_list(length=None)
        # Remove MongoDB _id fields
        for testimonial in testimonials:
            testimonial.pop('_id', None)
        return [TestimonialModel(**testimonial) for testimonial in testimonials]
        
    except Exception as e:
        logger.error(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/certifications", response_model=List[CertificationModel])
async def get_certifications():
    """Get certifications"""
    try:
        certifications = await db.certifications.find().sort("date", -1).to_list(length=None)
        # Remove MongoDB _id fields
        for cert in certifications:
            cert.pop('_id', None)
        return [CertificationModel(**cert) for cert in certifications]
        
    except Exception as e:
        logger.error(f"Error fetching certifications: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/awards", response_model=List[AwardModel])
async def get_awards():
    """Get awards and recognitions"""
    try:
        awards = await db.awards.find().sort("year", -1).to_list(length=None)
        # Remove MongoDB _id fields
        for award in awards:
            award.pop('_id', None)
        return [AwardModel(**award) for award in awards]
        
    except Exception as e:
        logger.error(f"Error fetching awards: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/contact")
async def submit_contact(contact: ContactModel):
    """Submit contact form"""
    try:
        # Generate unique ID for the contact submission
        contact_id = str(uuid.uuid4())
        
        contact_data = {
            "id": contact_id,
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message,
            "phone": contact.phone,
            "company": contact.company,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "new"
        }
        
        # Insert into database
        await db.contacts.insert_one(contact_data)
        
        return {
            "message": "Contact form submitted successfully",
            "id": contact_id,
            "status": "received"
        }
        
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@app.get("/api/stats")
async def get_stats():
    """Get portfolio statistics"""
    try:
        # Get dynamic stats
        total_projects = await db.projects.count_documents({})
        total_testimonials = await db.testimonials.count_documents({"approved": True})
        total_awards = await db.awards.count_documents({})
        total_messages = await db.contacts.count_documents({})
        new_messages = await db.contacts.count_documents({"status": "new"})
        
        stats = {
            **DEFAULT_STATS,
            "totalProjects": total_projects,
            "totalTestimonials": total_testimonials,
            "totalAwards": total_awards,
            "totalMessages": total_messages,
            "newMessages": new_messages,
            "lastUpdated": datetime.now(timezone.utc).isoformat()
        }
        
        return stats
        
    except Exception as e:
        logger.error(f"Error fetching stats: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception handler caught: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error occurred"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)