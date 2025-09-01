import logging
from datetime import datetime
from .default_data import (
    get_default_skills,
    get_default_experience,
    get_default_projects,
    get_default_testimonials,
    get_default_awards
)

logger = logging.getLogger(__name__)

async def seed_database(db):
    """Seed the database with default data if collections are empty"""
    
    try:
        # Seed skills
        skills_count = await db.skills.count_documents({})
        if skills_count == 0:
            skills_data = get_default_skills()
            skills_data['updatedAt'] = datetime.utcnow()
            await db.skills.insert_one(skills_data)
            logger.info("Seeded skills collection")
        
        # Seed experience
        experience_count = await db.experience.count_documents({})
        if experience_count == 0:
            experience_data = get_default_experience()
            for exp in experience_data:
                exp['createdAt'] = datetime.utcnow()
                exp['updatedAt'] = datetime.utcnow()
            await db.experience.insert_many(experience_data)
            logger.info(f"Seeded experience collection with {len(experience_data)} records")
        
        # Seed projects
        projects_count = await db.projects.count_documents({})
        if projects_count == 0:
            projects_data = get_default_projects()
            for project in projects_data:
                project['createdAt'] = datetime.utcnow()
                project['updatedAt'] = datetime.utcnow()
            await db.projects.insert_many(projects_data)
            logger.info(f"Seeded projects collection with {len(projects_data)} records")
        
        # Seed testimonials
        testimonials_count = await db.testimonials.count_documents({})
        if testimonials_count == 0:
            testimonials_data = get_default_testimonials()
            for testimonial in testimonials_data:
                testimonial['createdAt'] = datetime.utcnow()
                testimonial['updatedAt'] = datetime.utcnow()
            await db.testimonials.insert_many(testimonials_data)
            logger.info(f"Seeded testimonials collection with {len(testimonials_data)} records")
        
        # Seed awards
        awards_count = await db.awards.count_documents({})
        if awards_count == 0:
            awards_data = get_default_awards()
            for award in awards_data:
                award['createdAt'] = datetime.utcnow()
                award['updatedAt'] = datetime.utcnow()
            await db.awards.insert_many(awards_data)
            logger.info(f"Seeded awards collection with {len(awards_data)} records")
        
        # Seed profile
        profile_count = await db.profile.count_documents({})
        if profile_count == 0:
            profile_data = {
                "name": "Bhavyasri Koduru",
                "title": "Senior Embedded Software Engineer",
                "email": "bhavyasreekoduri@gmail.com",
                "phone": "+1-734-447-6301",
                "location": "Westland, Michigan, 48185",
                "linkedin": "bhavyasrikoduru",
                "github": "bhavyasrikoduru",
                "bio": "Experienced Embedded Software Developer with over 6 years of comprehensive expertise in automotive software development, validation, and system integration. Proven track record in Model-Based Development (MBD), Chassis Control, Body Control Module (BCM), and Functional Safety across SDV and advanced engineering projects.",
                "availability": "Available for new opportunities",
                "updatedAt": datetime.utcnow()
            }
            await db.profile.insert_one(profile_data)
            logger.info("Seeded profile collection")
        
        logger.info("Database seeding completed successfully")
        
    except Exception as e:
        logger.error(f"Error during database seeding: {str(e)}")
        raise e