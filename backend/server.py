from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Bhavyasri Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Custom JSON Encoder for ObjectId
class JSONEncoder:
    @staticmethod
    def encode_object_id(obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, dict):
            return {k: JSONEncoder.encode_object_id(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [JSONEncoder.encode_object_id(item) for item in obj]
        return obj

# Pydantic Models
class Skill(BaseModel):
    name: str
    level: int = Field(..., ge=0, le=100)
    category: str

class DomainExpertise(BaseModel):
    name: str
    expertise: str  # 'Expert', 'Advanced', 'Intermediate'

class SkillsResponse(BaseModel):
    technical: List[Skill]
    domains: List[DomainExpertise]

class Experience(BaseModel):
    id: Optional[str] = None
    company: str
    position: str
    duration: str
    location: str
    type: str
    description: str
    achievements: List[str]
    technologies: List[str]
    order: Optional[int] = 0

class Project(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    description: str
    technologies: List[str]
    features: List[str]
    status: str
    timeline: str
    impact: str
    imageUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    featured: Optional[bool] = False
    order: Optional[int] = 0

class Testimonial(BaseModel):
    id: Optional[str] = None
    name: str
    position: str
    company: str
    content: str
    rating: int = Field(..., ge=1, le=5)
    imageUrl: Optional[str] = None
    approved: Optional[bool] = True
    order: Optional[int] = 0

class Award(BaseModel):
    id: Optional[str] = None
    title: str
    organization: str
    year: str
    description: str
    imageUrl: Optional[str] = None
    order: Optional[int] = 0

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessageResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: str
    createdAt: datetime

class Profile(BaseModel):
    name: str
    title: str
    email: str
    phone: str
    location: str
    linkedin: str
    github: Optional[str] = None
    bio: str
    availability: str
    resumeUrl: Optional[str] = None
    profileImageUrl: Optional[str] = None

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Bhavyasri Portfolio API", "version": "1.0.0", "status": "active"}

@api_router.get("/health")
async def health_check():
    try:
        # Test database connection
        await db.command("ping")
        return {"status": "healthy", "database": "connected", "timestamp": datetime.utcnow()}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {str(e)}")

# Profile endpoints
@api_router.get("/profile", response_model=Profile)
async def get_profile():
    try:
        profile = await db.profile.find_one()
        if not profile:
            # Return default profile if none exists
            default_profile = {
                "name": "Bhavyasri Koduru",
                "title": "Senior Embedded Software Engineer",
                "email": "bhavyasreekoduri@gmail.com",
                "phone": "+1-734-447-6301",
                "location": "Westland, Michigan, 48185",
                "linkedin": "bhavyasri-k-9b281b12b",
                "github": "bhavyasrikoduru",
                "bio": "Experienced Embedded Software Developer with over 6 years of comprehensive expertise in automotive software development, validation, and system integration.",
                "availability": "Available for new opportunities"
            }
            return Profile(**default_profile)
        
        # Remove MongoDB _id and convert to Profile model
        profile.pop('_id', None)
        return Profile(**profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile: {str(e)}")

# Skills endpoints
@api_router.get("/skills", response_model=SkillsResponse)
async def get_skills():
    try:
        skills_doc = await db.skills.find_one()
        if not skills_doc:
            # Return default skills if none exist in database
            from data.default_data import get_default_skills
            return get_default_skills()
        
        skills_doc.pop('_id', None)
        return SkillsResponse(**skills_doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch skills: {str(e)}")

# Experience endpoints
@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    try:
        experiences = await db.experience.find().sort("order", 1).to_list(100)
        result = []
        for exp in experiences:
            exp['id'] = str(exp.pop('_id'))
            result.append(Experience(**exp))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch experience: {str(e)}")

# Projects endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects(category: Optional[str] = None):
    try:
        query = {}
        if category and category != "All":
            query["category"] = category
            
        projects = await db.projects.find(query).sort("order", 1).to_list(100)
        result = []
        for project in projects:
            project['id'] = str(project.pop('_id'))
            result.append(Project(**project))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch projects: {str(e)}")

# Testimonials endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    try:
        testimonials = await db.testimonials.find({"approved": True}).sort("order", 1).to_list(100)
        result = []
        for testimonial in testimonials:
            testimonial['id'] = str(testimonial.pop('_id'))
            result.append(Testimonial(**testimonial))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch testimonials: {str(e)}")

# Awards endpoints
@api_router.get("/awards", response_model=List[Award])
async def get_awards():
    try:
        awards = await db.awards.find().sort("order", 1).to_list(100)
        result = []
        for award in awards:
            award['id'] = str(award.pop('_id'))
            result.append(Award(**award))
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch awards: {str(e)}")

# Contact endpoints
@api_router.post("/contact", response_model=Dict[str, str])
async def submit_contact_message(message: ContactMessage, request: Request):
    try:
        # Get client info
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        # Create message document
        message_doc = {
            "name": message.name,
            "email": message.email,
            "subject": message.subject,
            "message": message.message,
            "status": "new",
            "ipAddress": client_ip,
            "userAgent": user_agent,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        
        # Insert into database
        result = await db.contact_messages.insert_one(message_doc)
        
        return {
            "message": "Message sent successfully",
            "id": str(result.inserted_id),
            "status": "received"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit message: {str(e)}")

# Statistics endpoint
@api_router.get("/stats")
async def get_stats():
    try:
        stats = {
            "totalMessages": await db.contact_messages.count_documents({}),
            "newMessages": await db.contact_messages.count_documents({"status": "new"}),
            "totalProjects": await db.projects.count_documents({}),
            "featuredProjects": await db.projects.count_documents({"featured": True}),
            "totalTestimonials": await db.testimonials.count_documents({"approved": True}),
            "totalAwards": await db.awards.count_documents({}),
            "lastUpdated": datetime.utcnow()
        }
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")

# Error handling middleware
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "status_code": 500}
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize database with default data on startup
@app.on_event("startup")
async def initialize_database():
    try:
        from data.seed_data import seed_database
        await seed_database(db)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
