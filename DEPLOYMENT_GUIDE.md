# Portfolio Website Deployment Guide

This guide provides step-by-step instructions to publish Bhavyasri's portfolio website on the web.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Frontend + Backend)
**Best for:** Full-stack deployment with automatic scaling

#### Prerequisites:
- GitHub account
- Vercel account (free tier available)

#### Steps:
1. **Prepare Repository:**
   ```bash
   # Create a new GitHub repository
   git init
   git add .
   git commit -m "Initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/bhavyasri-portfolio.git
   git push -u origin main
   ```

2. **Frontend Deployment:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset:** Create React App
     - **Root Directory:** `frontend`
     - **Build Command:** `yarn build`
     - **Output Directory:** `build`
   - Add environment variables:
     - `REACT_APP_BACKEND_URL` = `https://your-backend-url.vercel.app`
   - Deploy

3. **Backend Deployment:**
   - Create another Vercel project for backend
   - Configure settings:
     - **Framework Preset:** Other
     - **Root Directory:** `backend`
     - **Build Command:** `pip install -r requirements.txt`
     - **Output Directory:** (leave empty)
   - Add environment variables:
     - `MONGO_URL` = your MongoDB connection string
     - `DB_NAME` = your database name
   - Deploy

### Option 2: Netlify + Railway
**Best for:** Separate frontend and backend hosting

#### Frontend on Netlify:
1. **Build the Frontend:**
   ```bash
   cd frontend
   yarn build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect GitHub repository
   - Configure environment variables:
     - `REACT_APP_BACKEND_URL` = your backend URL

#### Backend on Railway:
1. **Prepare Backend:**
   ```bash
   cd backend
   # Create Procfile
   echo "web: uvicorn server:app --host 0.0.0.0 --port \$PORT" > Procfile
   ```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Select backend folder
   - Add environment variables:
     - `MONGO_URL` = your MongoDB connection string
     - `DB_NAME` = your database name
   - Deploy

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)
**Best for:** Full control and custom configurations

#### Prerequisites:
- VPS server (Ubuntu 20.04+ recommended)
- Domain name (optional)
- SSL certificate (Let's Encrypt recommended)

#### Steps:
1. **Server Setup:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install Python
   sudo apt install -y python3 python3-pip
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   ```

2. **Deploy Application:**
   ```bash
   # Clone repository
   git clone https://github.com/YOUR-USERNAME/bhavyasri-portfolio.git
   cd bhavyasri-portfolio
   
   # Backend setup
   cd backend
   pip3 install -r requirements.txt
   
   # Create PM2 ecosystem file
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'portfolio-backend',
       script: 'uvicorn',
       args: 'server:app --host 0.0.0.0 --port 8001',
       cwd: './backend',
       env: {
         MONGO_URL: 'your-mongodb-connection-string',
         DB_NAME: 'portfolio'
       }
     }]
   }
   EOF
   
   # Start backend
   pm2 start ecosystem.config.js
   
   # Frontend setup
   cd ../frontend
   npm install
   npm run build
   
   # Copy build to nginx
   sudo cp -r build/* /var/www/html/
   ```

3. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/portfolio
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /var/www/html;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:8001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
   
   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 📊 Database Setup Options

### Option 1: MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get connection string
6. Use in MONGO_URL environment variable

### Option 2: Self-hosted MongoDB
```bash
# Install MongoDB
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
> use portfolio
> db.createUser({user: "portfolio", pwd: "secure-password", roles: ["readWrite"]})
```

## 🔧 Environment Configuration

### Frontend Environment Variables:
```env
REACT_APP_BACKEND_URL=https://your-backend-domain.com
```

### Backend Environment Variables:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=portfolio
```

## 🌐 Domain Configuration

### 1. Purchase Domain:
- Namecheap, GoDaddy, Google Domains, etc.

### 2. Configure DNS:
```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: CNAME  
Name: www
Value: your-domain.com
```

### 3. SSL Certificate (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 📁 Resume File Setup

### Important Note:
The resume download requires a real PDF file. Currently, there's a placeholder at `/app/frontend/public/resume.pdf`.

### To Replace with Actual Resume:
1. **Create/Update Resume PDF:**
   - Save your actual resume as `resume.pdf`
   - Ensure it's properly formatted and professional

2. **Replace File:**
   ```bash
   # Replace the placeholder file
   cp /path/to/your/actual/resume.pdf /app/frontend/public/resume.pdf
   ```

3. **Rebuild Frontend:**
   ```bash
   cd frontend
   yarn build
   ```

4. **For Production:**
   - Upload the new `resume.pdf` to your hosting service
   - Ensure it's accessible at `https://your-domain.com/resume.pdf`

### Database Alternative (Advanced):
If you want to manage resume uploads through a database:

1. **Add Resume Upload Endpoint:**
   ```python
   # In backend/server.py
   @api_router.post("/upload/resume")
   async def upload_resume(file: UploadFile = File(...)):
       # Save file to storage
       # Update profile with resume URL
       return {"message": "Resume uploaded successfully"}
   ```

2. **Update Frontend:**
   ```javascript
   // Fetch resume URL from profile endpoint
   const profile = await apiService.getProfile();
   const resumeUrl = profile.resumeUrl || '/resume.pdf';
   ```

## 🔍 Testing Deployment

### 1. Pre-deployment Checklist:
- [ ] All environment variables configured
- [ ] Database connection working
- [ ] Resume PDF file uploaded
- [ ] Build process successful
- [ ] No console errors in browser

### 2. Post-deployment Testing:
- [ ] Website loads correctly
- [ ] All navigation links work
- [ ] Contact information displays properly
- [ ] Resume download works
- [ ] Skills load from database
- [ ] Experience loads from database
- [ ] Mobile responsive design working
- [ ] Page load speed acceptable

### 3. Performance Optimization:
```bash
# Enable gzip compression in Nginx
sudo nano /etc/nginx/nginx.conf

# Add in http block:
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_comp_level 9;
```

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure backend allows frontend domain in CORS settings
   - Check REACT_APP_BACKEND_URL is correct

2. **Database Connection:**
   - Verify MONGO_URL format
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Resume Download Not Working:**
   - Verify resume.pdf exists in public folder
   - Check file permissions
   - Ensure correct MIME type served

4. **Build Errors:**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

## 📈 Monitoring & Maintenance

### 1. Set up Monitoring:
- Use PM2 for backend process monitoring
- Set up log rotation
- Configure alerts for downtime

### 2. Regular Updates:
- Keep dependencies updated
- Monitor security vulnerabilities
- Backup database regularly

### 3. Analytics (Optional):
```javascript
// Add Google Analytics to public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

## 💰 Cost Estimates

### Free Tier Options:
- **Vercel:** Free for personal projects
- **Netlify:** Free for small sites
- **MongoDB Atlas:** 512MB free tier
- **GitHub:** Free for public repositories

### Paid Options:
- **VPS (DigitalOcean):** $5/month basic droplet
- **Domain:** $10-15/year
- **MongoDB Atlas:** $9/month for dedicated cluster

## 🎯 Recommended Deployment Path

For **Bhavyasri's portfolio**, I recommend:

1. **Frontend:** Vercel or Netlify (free, automatic deployments)
2. **Backend:** Vercel or Railway (free tier available)
3. **Database:** MongoDB Atlas (free 512MB tier)
4. **Domain:** Optional, but professional

This setup provides:
- ✅ Zero maintenance
- ✅ Automatic SSL
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Free or very low cost
- ✅ High reliability

**Total Monthly Cost:** $0 (using free tiers) to $15/month (with custom domain and upgraded services)

Choose the option that best fits your technical comfort level and budget requirements!