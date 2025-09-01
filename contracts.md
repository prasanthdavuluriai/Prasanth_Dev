# Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan to transform the frontend portfolio from mock data to a fully functional full-stack application.

## Mock Data Currently Used
- **Skills Data**: Technical skills with levels, domain expertise
- **Experience Data**: Work history with achievements and technologies
- **Projects Data**: Project showcases with features and impact
- **Testimonials Data**: Client recommendations and ratings
- **Awards Data**: Professional recognition and achievements
- **Contact Info**: Personal contact information

## Database Schema

### 1. Skills Collection
```javascript
{
  _id: ObjectId,
  technical: [
    {
      name: String,
      level: Number, // 1-100
      category: String // 'Development', 'Architecture', etc.
    }
  ],
  domains: [
    {
      name: String,
      expertise: String // 'Expert', 'Advanced', 'Intermediate'
    }
  ],
  updatedAt: Date
}
```

### 2. Experience Collection
```javascript
{
  _id: ObjectId,
  company: String,
  position: String,
  duration: String,
  location: String,
  type: String, // 'Full-time', 'Contract', etc.
  description: String,
  achievements: [String],
  technologies: [String],
  order: Number, // For display ordering
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Projects Collection
```javascript
{
  _id: ObjectId,
  title: String,
  category: String,
  description: String,
  technologies: [String],
  features: [String],
  status: String, // 'Production', 'Completed', 'Ongoing'
  timeline: String,
  impact: String,
  imageUrl: String, // Optional project image
  githubUrl: String, // Optional GitHub link
  liveUrl: String, // Optional live demo link
  featured: Boolean, // For highlighting important projects
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Testimonials Collection
```javascript
{
  _id: ObjectId,
  name: String,
  position: String,
  company: String,
  content: String,
  rating: Number, // 1-5
  imageUrl: String, // Optional profile image
  approved: Boolean, // For moderation
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Awards Collection
```javascript
{
  _id: ObjectId,
  title: String,
  organization: String,
  year: String,
  description: String,
  imageUrl: String, // Optional award image
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Contact Messages Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'replied'
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Profile Collection (Single Document)
```javascript
{
  _id: ObjectId,
  name: String,
  title: String,
  email: String,
  phone: String,
  location: String,
  linkedin: String,
  github: String,
  bio: String,
  availability: String,
  resumeUrl: String,
  profileImageUrl: String,
  updatedAt: Date
}
```

## API Endpoints

### Portfolio Data Endpoints
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile (admin)
- `GET /api/skills` - Get all skills data
- `GET /api/experience` - Get work experience
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=<category>` - Get projects by category
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/awards` - Get awards and recognition

### Contact & Admin Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin)
- `PUT /api/contact/messages/:id` - Update message status (admin)
- `POST /api/upload/resume` - Upload resume file (admin)

### Health & Stats Endpoints
- `GET /api/health` - Health check
- `GET /api/stats` - Get portfolio statistics (views, messages, etc.)

## Frontend Integration Plan

### 1. API Service Layer
Create `/src/services/api.js` with:
- Axios configuration with base URL
- Error handling wrapper
- Request/response interceptors
- Retry logic for failed requests

### 2. Data Fetching Strategy
- Replace mock data imports with API calls
- Add loading states for all data fetching
- Implement error handling with user-friendly messages
- Add skeleton loading components

### 3. State Management
- Use React hooks for state management
- Add loading and error states
- Implement data caching where appropriate
- Add refresh mechanisms

### 4. Form Integration
- Contact form submission to `/api/contact`
- Form validation and error handling
- Success/failure feedback
- Email format validation
- Spam protection (rate limiting)

### 5. Performance Optimizations
- Lazy loading for heavy components
- Image optimization
- Data pagination where needed
- Cache API responses

## Backend Implementation Steps

### Phase 1: Basic Backend Setup
1. Update server.py with new models
2. Create database connection and collections
3. Implement basic CRUD operations
4. Add data seeding script

### Phase 2: API Development
1. Implement all GET endpoints
2. Add contact form POST endpoint
3. Implement error handling middleware
4. Add request validation

### Phase 3: Frontend Integration
1. Create API service layer
2. Replace mock data with API calls
3. Add loading states and error handling
4. Test all functionality

### Phase 4: Advanced Features
1. Add file upload for resume
2. Implement admin panel (basic)
3. Add analytics tracking
4. Implement rate limiting

## Data Migration
1. Transform current mock data to match database schema
2. Create seeding script to populate initial data
3. Ensure data consistency and validation

## Testing Strategy
1. Backend API testing with sample requests
2. Frontend integration testing
3. End-to-end contact form testing
4. Performance testing under load

## Security Considerations
1. Input validation and sanitization
2. Rate limiting for contact form
3. CORS configuration
4. Environment variable protection
5. Database connection security

## Error Handling
1. Graceful degradation when API fails
2. User-friendly error messages
3. Fallback to cached data where possible
4. Proper HTTP status codes
5. Logging for debugging

This contract ensures a smooth transition from mock data to a fully functional backend while maintaining the excellent user experience already established in the frontend.