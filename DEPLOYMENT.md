# 🚀 Vercel Deployment Guide

## Quick 2-Command Deployment

Your fullstack e-commerce project is configured for seamless Vercel deployment with just **2 commands**:

### 🏗️ Build Command
```bash
npm run build
```
**What it does:**
- Builds both frontend and backend
- Frontend: Creates optimized production build in `frontend/dist/`
- Backend: Installs production dependencies

### 🚀 Development Command
```bash
npm run dev
```
**What it does:**
- Starts both frontend (port 5173) and backend (port 5000)
- Enables hot reload for development
- Perfect for local testing before deployment

---

## 🌐 Vercel Deployment Methods

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```
   
   Vercel will automatically:
   - Run `npm run install:all` to install dependencies
   - Run `npm run build` to build your project
   - Deploy both frontend and backend

### Method 2: GitHub Integration

1. **Push to GitHub**
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel auto-detects the configuration

---

## ⚙️ Environment Variables

**Required for deployment:**

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `MONGODB_URI` | Your MongoDB connection string | Vercel Dashboard |
| `NODE_ENV` | `production` | Auto-set by Vercel |

**Set in Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `MONGODB_URI` with your MongoDB connection string

---

## 🏗️ Build Configuration

### Automatic Build Process
Vercel automatically runs:
```bash
npm run install:all  # Install all dependencies
npm run build        # Build both apps
```

### Build Outputs
- **Frontend**: Built to `frontend/dist/` (served as static files)
- **Backend**: Deployed as serverless functions at `/api/*`

---

## 🌍 URL Structure After Deployment

```
https://your-app.vercel.app/
├── /                    → Frontend (React app)
├── /products           → Frontend product pages
├── /cart              → Frontend cart page
├── /api/              → Backend API documentation
├── /api/products      → Products API endpoints
└── /api/cart          → Cart API endpoints
```

---

## ✅ Deployment Checklist

**Pre-deployment:**
- [x] Build configuration ready (`npm run build`)
- [x] Development server works (`npm run dev`)
- [x] `vercel.json` configured
- [x] Frontend builds to correct directory
- [x] Backend exports app for serverless
- [x] CORS configured for production
- [x] API uses relative paths in production

**During deployment:**
- [ ] Set `MONGODB_URI` in Vercel dashboard
- [ ] Deploy using `vercel` command or GitHub
- [ ] Test deployment endpoints

**Post-deployment testing:**
```bash
# Test API health
curl https://your-app.vercel.app/api

# Test products endpoint
curl https://your-app.vercel.app/api/products

# Test frontend
curl https://your-app.vercel.app/
```

---

## 🔧 Local Testing Before Deployment

**Test build locally:**
```bash
# Build both apps
npm run build

# Start production preview
npm run start
```

**Test individual components:**
```bash
# Frontend only
cd frontend && npm run preview

# Backend only  
cd backend && npm start
```

---

## 🚨 Troubleshooting

### Common Issues

**Build fails:**
- Run `npm run clean` then `npm run install:all`
- Check all dependencies are installed
- Verify MongoDB URI is set in Vercel

**API not accessible:**
- Ensure `MONGODB_URI` is set in Vercel dashboard
- Check CORS configuration allows your domain
- Verify API endpoints return 200 status

**Frontend not loading:**
- Check build completed successfully
- Verify `frontend/dist/` directory exists
- Check console for JavaScript errors

### Debug Commands
```bash
# Clean and rebuild
npm run clean
npm run install:all
npm run build

# Check build outputs
ls frontend/dist/
ls backend/node_modules/

# Test APIs locally
npm run dev
# Then test: http://localhost:5000/api
```

---

## 🎯 Production URLs

After successful deployment:
- **App**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api`
- **Health Check**: `https://your-app.vercel.app/api`

---

## 📞 Support

If deployment fails:
1. Check Vercel build logs
2. Verify environment variables are set
3. Test `npm run build` locally first
4. Ensure MongoDB is accessible from internet

**Happy deploying! 🚀**
