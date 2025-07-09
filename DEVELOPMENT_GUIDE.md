# 🚀 Development Quick Start Guide

## 🎯 Quick Commands

### Start Development (Both Apps)
```bash
npm run dev
```
- Starts backend on http://localhost:5000
- Starts frontend on http://localhost:5173 (or next available port)
- Both servers auto-reload on file changes

### Build for Production
```bash
npm run build
```
- Builds both frontend and backend for production
- Frontend builds to `frontend/dist/`
- Backend dependencies are verified

### Individual Development
```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend
```

### Database Management
```bash
# Seed with sample data
npm run db:seed

# View database statistics
npm run db:stats

# Clear all data
npm run db:clear
```

## 🔧 First Time Setup

1. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

2. **Configure backend environment**:
   ```bash
   cd backend
   # Edit .env file with your MongoDB connection
   ```

3. **Seed database with sample data**:
   ```bash
   npm run db:seed
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

## 📁 What Each Command Does

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts both frontend and backend in development mode |
| `npm run build` | Builds both applications for production |
| `npm run start` | Starts both applications in production mode |
| `npm run install:all` | Installs dependencies for both frontend and backend |
| `npm run setup` | Complete setup: install dependencies + seed database |
| `npm run clean` | Removes node_modules from both apps |
| `npm run db:seed` | Adds sample data to database |
| `npm run db:stats` | Shows database statistics |
| `npm run db:clear` | Removes all cart data |

## 🌐 Development URLs

- **Frontend**: http://localhost:5173 (auto-increments if port busy)
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api

## 🛠️ Development Features

### Auto-Reload
- Frontend: Vite HMR (Hot Module Replacement)
- Backend: Nodemon (automatic restart on file changes)

### API Testing
- Built-in API documentation at `/api`
- All endpoints include rate limiting headers
- Request logging in backend console

### Database Tools
- Seed sample cart data for testing
- View real-time database statistics
- Clear development data when needed

## 🔍 Debugging

### Backend Issues
- Check MongoDB connection in backend/.env
- View request logs in backend console
- API documentation at http://localhost:5000/api

### Frontend Issues  
- Check browser console for errors
- Verify backend is running on port 5000
- Check Redux DevTools for state management

### Both Not Starting
```bash
# Kill any processes on ports
npx kill-port 5000 5173

# Clean and reinstall
npm run clean
npm run install:all

# Try again
npm run dev
```

## 📊 Project Status

✅ Backend: Professional Node.js/Express API  
✅ Frontend: Modern React with Redux  
✅ Database: MongoDB with cart persistence  
✅ Development: Hot reload for both apps  
✅ Production: Build scripts ready  
✅ Documentation: Comprehensive guides  

Happy coding! 🎉
