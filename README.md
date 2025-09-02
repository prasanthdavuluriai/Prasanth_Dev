# Bhavyasri Koduru - Portfolio Website

A modern, responsive portfolio website built with React, FastAPI, and MongoDB, showcasing 6+ years of experience in automotive embedded software engineering.

## 🚀 Quick Deployment

The website is now structured for easy deployment with `index.html` at the root level.

### Static Deployment (Recommended)
Simply upload these files to any static hosting service:
- `index.html` (root level)
- `static/` folder (contains CSS/JS)
- `resume.pdf`

### Supported Platforms
- **Netlify**: Drag and drop the root folder
- **Vercel**: Import repository, set build output to `./`
- **GitHub Pages**: Enable pages from root directory
- **Surge.sh**: `surge . your-domain.com`

## ✨ Features

- **Modern Design**: Tech/futuristic theme with neon cyan accents
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile  
- **Dynamic Content**: Skills, experience, and projects loaded from database
- **Contact Integration**: Professional contact information with resume download
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Proper meta tags and structured data

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Axios** - HTTP client for API calls

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database with Motor async driver
- **Pydantic** - Data validation and serialization

## 📦 Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+ and pip
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/bhavyasri-portfolio.git
   cd bhavyasri-portfolio
   ```

2. **Install dependencies:**
   ```bash
   # Frontend dependencies
   cd frontend && npm install && cd ..
   
   # Backend dependencies  
   cd backend && pip install -r requirements.txt && cd ..
   ```

3. **Environment Setup:**
   ```bash
   # Update backend/.env with your MongoDB URL
   # Update frontend/.env with your backend URL
   ```

4. **Development:**
   ```bash
   # Frontend
   cd frontend && npm start
   
   # Backend
   cd backend && python server.py
   ```

5. **Build for Production:**
   ```bash
   cd frontend && npm run build
   cp -r build/* ../
   ```

## 🏗️ Project Structure

```
/
├── index.html              # Main HTML file (root level) ⭐
├── static/                 # Built CSS/JS assets ⭐
├── resume.pdf             # Downloadable resume ⭐
├── server.js              # Optional Express server
├── package.json           # Root dependencies
├── frontend/              # React application source
├── backend/               # FastAPI application
└── docs/                  # Documentation
```

**⭐ = Required files for static deployment**

## 📞 Contact

- **Email**: bhavyasreekoduri@gmail.com
- **Phone**: +1-734-447-6301
- **Location**: Westland, Michigan
- **LinkedIn**: [bhavyasri-k-9b281b12b](https://www.linkedin.com/in/bhavyasri-k-9b281b12b)

---

**Ready for deployment! 🚀**
