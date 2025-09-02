# Portfolio Content Update Guide

This guide shows you exactly where and how to update all content in Bhavyasri's portfolio website without needing technical assistance.

## 📁 File Structure Overview

```
/app/
├── frontend/src/
│   ├── components/          # All website sections
│   │   ├── Hero.jsx        # Home page hero section
│   │   ├── About.jsx       # About me section
│   │   ├── Skills.jsx      # Skills & competencies
│   │   ├── Experience.jsx  # Work experience
│   │   ├── Projects.jsx    # Projects showcase
│   │   ├── Testimonials.jsx # Testimonials & awards
│   │   ├── Contact.jsx     # Contact information
│   │   └── Header.jsx      # Navigation header
│   └── data/mockData.js    # Legacy data (not used anymore)
└── backend/data/
    ├── default_data.py     # Main database content
    └── seed_data.py        # Database initialization
```

## 🏠 1. Hero Section Updates
**File:** `/app/frontend/src/components/Hero.jsx`

### Statistics Cards
**Location:** Line ~16-21
```javascript
const stats = [
  { icon: '🚗', number: '6+', label: 'Years Experience', subtitle: 'Automotive Software' },
  { icon: '⚡', number: '98%', label: 'Success Rate', subtitle: 'Test Validation' },
  { icon: '🔧', number: '50+', label: 'Projects Delivered', subtitle: 'MBD & Validation' },
  { icon: '🏆', number: '3', label: 'Awards Won', subtitle: 'Client Champion' }
];
```

### Main Title & Description
**Location:** Line ~50-60
```javascript
<h1 className="text-5xl lg:text-6xl font-bold leading-tight">
  Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Bhavyasri</span>
</h1>
<p className="text-xl text-slate-300 leading-relaxed">
  Transforming automotive innovation through <span className="text-cyan-400 font-semibold">Model-Based Development</span> and cutting-edge embedded solutions. Specialist in Chassis Control, AUTOSAR, and ISO 26262 compliance.
</p>
```

### Location Info
**Location:** Line ~75-85
```javascript
<div className="flex items-center space-x-2">
  <MapPin size={16} />
  <span>Westland, Michigan</span>
</div>
```

## 👤 2. About Section Updates
**File:** `/app/frontend/src/components/About.jsx`

### Section Title
**Location:** Line ~35-40
```javascript
<h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
  Passionate About <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">Automotive Innovation</span>
</h2>
```

### About Text Paragraphs
**Location:** Line ~50-70
```javascript
<p className="text-lg leading-relaxed">
  My journey began with a fascination for how software controls the vehicles we depend on every day. From my early days working on Chassis and BCM functionalities to leading complex SDV projects, I've consistently delivered solutions that prioritize both innovation and safety.
</p>
<p className="text-lg leading-relaxed">
  What drives me is the challenge of creating robust, safety-critical systems that meet the highest industry standards. Whether it's implementing ISO 26262 compliance, optimizing CI/CD pipelines, or mentoring teams through complex validation processes, I thrive on solving problems that matter.
</p>
<p className="text-lg leading-relaxed">
  Currently based in Michigan, I'm passionate about the future of automotive technology and excited to contribute to the next generation of intelligent vehicle systems.
</p>
```

### Highlight Cards
**Location:** Line ~15-40
```javascript
const highlights = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Model-Based Development Expert",
    description: "MATLAB/Simulink specialist with deep expertise in automotive software architecture"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Functional Safety Leader", 
    description: "ISO 26262 compliant systems, ASIL-B certified with proven safety-critical experience"
  },
  // Add more highlight cards here...
];
```

## 🔧 3. Skills Section Updates

### Backend Database Method (Recommended)
**File:** `/app/backend/data/default_data.py`

**Location:** Line ~5-25
```python
def get_default_skills():
    return {
        "technical": [
            {"name": "MATLAB/Simulink", "level": 95, "category": "Development"},
            {"name": "Stateflow", "level": 90, "category": "Development"},
            {"name": "AUTOSAR", "level": 88, "category": "Architecture"},
            # Add more technical skills here...
        ],
        "domains": [
            {"name": "Chassis Control Systems", "expertise": "Expert"},
            {"name": "Body Control Module (BCM)", "expertise": "Expert"},
            # Add more domain expertise here...
        ]
    }
```

### How to Add New Skills:
1. Add to `technical` array with `name`, `level` (1-100), and `category`
2. Categories: Development, Architecture, Programming, Safety, Methodology, Tools, DevOps, Testing, Communication, Management
3. Add to `domains` array with `name` and `expertise` (Expert/Advanced/Intermediate)

## 💼 4. Experience Section Updates
**File:** `/app/backend/data/default_data.py`

**Location:** Line ~30-80
```python
def get_default_experience():
    return [
        {
            "company": "KPIT Technologies",
            "position": "Senior Software Engineer",
            "duration": "July 2023 - Jan 2025",
            "location": "India",
            "type": "Full-time",
            "description": "Led advanced engineering projects in Chassis Development for SDV...",
            "achievements": [
                "Pioneered Software-in-Loop (SIL) testing using Matrix framework...",
                "Successfully rectified Polyspace and SonarQube compliance issues...",
                # Add more achievements...
            ],
            "technologies": ["MATLAB/Simulink", "Robot Framework", "Jenkins"],
            "order": 1
        },
        # Add more experience entries...
    ]
```

### How to Add New Experience:
1. Add new dictionary to the array
2. Include all required fields: company, position, duration, location, type, description, achievements, technologies, order
3. Lower `order` number = appears first

## 🚀 5. Projects Section Updates
**File:** `/app/backend/data/default_data.py`

**Location:** Line ~85-150
```python
def get_default_projects():
    return [
        {
            "title": "Chassis Control System Development",
            "category": "Model-Based Development",
            "description": "Advanced Chassis Control system for Software Defined Vehicles...",
            "technologies": ["MATLAB/Simulink", "Stateflow", "AUTOSAR", "ISO 26262"],
            "features": [
                "Finite State Machine (FSM) implementation for chassis control logic",
                "ASIL-compliant safety mechanisms integration",
                # Add more features...
            ],
            "status": "Production",  # Production, Completed, Ongoing
            "timeline": "8 months",
            "impact": "Reduced system response time by 25% while maintaining safety compliance",
            "featured": True,  # True for important projects
            "order": 1
        },
        # Add more projects...
    ]
```

### Project Categories:
- Model-Based Development
- Embedded Systems  
- DevOps & Testing
- Safety & Compliance

## 💬 6. Testimonials Section Updates
**File:** `/app/backend/data/default_data.py`

**Location:** Line ~155-200
```python
def get_default_testimonials():
    return [
        {
            "name": "Rajesh Kumar",
            "position": "Technical Lead",
            "company": "KPIT Technologies", 
            "content": "Bhavyasri's expertise in Model-Based Development is exceptional...",
            "rating": 5,  # 1-5 stars
            "approved": True,
            "order": 1
        },
        # Add more testimonials...
    ]
```

### Trust Indicators Statistics
**File:** `/app/frontend/src/components/Testimonials.jsx`
**Location:** Line ~200-230
```javascript
<div className="text-center">
  <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
  <div className="text-gray-100 font-semibold">Test Success Rate</div>
  <div className="text-slate-400 text-sm mt-1">MIL/SIL Validation</div>
</div>
<div className="text-center">
  <div className="text-3xl font-bold text-cyan-400 mb-2">10</div>
  <div className="text-gray-100 font-semibold">Critical Defects</div>
  <div className="text-slate-400 text-sm mt-1">Production Releases</div>
</div>
<div className="text-center">
  <div className="text-3xl font-bold text-cyan-400 mb-2">60%</div>
  <div className="text-gray-100 font-semibold">Efficiency Gain</div>
  <div className="text-slate-400 text-sm mt-1">Process Improvement</div>
</div>
```

## 🏆 7. Awards Section Updates
**File:** `/app/backend/data/default_data.py`

**Location:** Line ~205-240
```python
def get_default_awards():
    return [
        {
            "title": "Client Champion Award",
            "organization": "KPIT Technologies",
            "year": "2024",
            "description": "Recognized for consistently providing outstanding support...",
            "order": 1
        },
        # Add more awards...
    ]
```

## 📞 8. Contact Information Updates

### Static Contact Info
**File:** `/app/frontend/src/components/Contact.jsx`
**Location:** Line ~10-18
```javascript
const contactInfo = {
  email: 'bhavyasreekoduri@gmail.com',
  phone: '+1-734-447-6301',
  location: 'Westland, Michigan, 48185',
  linkedin: 'bhavyasri-k-9b281b12b', 
  availability: 'Available for new opportunities'
};
```

### Footer Contact Info
**File:** `/app/frontend/src/components/Footer.jsx`
**Location:** Line ~70-85
```javascript
<div className="flex items-center space-x-3 text-slate-400">
  <Mail className="w-4 h-4 text-cyan-400" />
  <span className="text-sm">{contactInfo.email}</span>
</div>
```

## 📋 9. Profile Information (Database)
**File:** `/app/backend/data/seed_data.py`
**Location:** Line ~65-80
```python
profile_data = {
    "name": "Bhavyasri Koduru",
    "title": "Senior Embedded Software Engineer", 
    "email": "bhavyasreekoduri@gmail.com",
    "phone": "+1-734-447-6301",
    "location": "Westland, Michigan, 48185",
    "linkedin": "bhavyasrikoduru",
    "github": "bhavyasrikoduru",
    "bio": "Experienced Embedded Software Developer with over 6 years...",
    "availability": "Available for new opportunities"
}
```

## 🔄 How to Apply Changes

### For Frontend Changes (Components):
1. Edit the `.jsx` files in `/app/frontend/src/components/`
2. Save the file
3. The website will automatically refresh (hot reload)

### For Backend Database Changes:
1. Edit `/app/backend/data/default_data.py`
2. Restart the backend server:
   ```bash
   sudo supervisorctl restart backend
   ```
3. The database will be updated with new content

### For Profile Changes:
1. Edit `/app/backend/data/seed_data.py`
2. Delete the current profile from database (optional - it will overwrite)
3. Restart backend: `sudo supervisorctl restart backend`

## 🎨 Color Scheme Reference

### Current Colors:
- **Background**: `#0F172A` (Dark Navy)
- **Primary**: `#22D3EE` (Neon Cyan)
- **Secondary**: `#64748B` (Cool Gray)
- **Accent**: `#F4F4F4` (Light Gray)

### CSS Classes:
- `text-cyan-400` - Neon cyan text
- `bg-slate-900` - Dark navy background
- `text-gray-100` - Light gray text
- `text-slate-300` - Medium gray text
- `bg-gradient-to-r from-cyan-400 to-cyan-600` - Cyan gradient

## 🚨 Important Notes

1. **Database vs Frontend**: Skills, Experience, Projects, Testimonials, and Awards load from the database. Update the backend files for these.

2. **Static vs Dynamic**: Hero section, About section, and Contact info are static in frontend components.

3. **Order Field**: Use the `order` field to control the sequence of items (lower number = appears first).

4. **Hot Reload**: Frontend changes appear immediately. Backend changes require restart.

5. **Backup**: Always backup files before making changes.

6. **Testing**: After making changes, scroll through the entire website to ensure everything displays correctly.

## 📧 Quick Reference - Most Common Updates

### Change Statistics:
- Hero stats: `/app/frontend/src/components/Hero.jsx` line ~16
- Trust indicators: `/app/frontend/src/components/Testimonials.jsx` line ~200

### Add New Job:
- `/app/backend/data/default_data.py` - `get_default_experience()` function
- Restart backend after changes

### Add New Project:
- `/app/backend/data/default_data.py` - `get_default_projects()` function  
- Restart backend after changes

### Update Contact Info:
- `/app/frontend/src/components/Contact.jsx` line ~10
- `/app/frontend/src/components/Footer.jsx` line ~70

### Change About Text:
- `/app/frontend/src/components/About.jsx` line ~50

This guide covers all major content updates. For advanced styling or functionality changes, technical assistance may be required.