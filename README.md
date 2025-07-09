# 🛒 E-commerce Full-Stack Application

A modern, professional e-commerce application built with React frontend and Node.js backend.

## 🏗️ Project Structure

```
ecommerce-fullstack/
├── 📁 frontend/          # React + Vite + Redux frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # State management
│   │   ├── services/     # API services
│   │   └── hooks/        # Custom hooks
│   └── package.json
├── 📁 backend/           # Node.js + Express + MongoDB backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── scripts/          # Development scripts
│   └── package.json
├── package.json          # Root package for managing both apps
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account or local MongoDB

### Installation & Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd ecommerce-fullstack
   npm run setup
   ```

2. **Configure environment variables**:
   ```bash
   # Copy and edit backend environment file
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start development servers**:
   ```bash
   npm run dev
   ```

This will start both frontend (http://localhost:5173) and backend (http://localhost:5000) simultaneously.

## 📋 Available Commands

### 🔥 Main Commands

```bash
# Development (runs both frontend and backend)
npm run dev

# Build for production (builds both apps)
npm run build

# Start production servers (runs both apps)
npm start
```

### 🛠️ Individual Commands

```bash
# Frontend only
npm run dev:frontend      # Start frontend dev server
npm run build:frontend    # Build frontend for production

# Backend only  
npm run dev:backend       # Start backend dev server
npm run start:backend     # Start backend production server
```

### 📦 Installation Commands

```bash
# Install dependencies for both apps
npm run install:all

# Install dependencies individually
npm run install:frontend
npm run install:backend

# Initial setup (install + seed database)
npm run setup
```

### 🗄️ Database Commands

```bash
# Database management
npm run db:seed           # Seed database with sample data
npm run db:clear          # Clear all cart data
npm run db:stats          # Show database statistics
npm run db:validate       # Validate all documents
```

## 🚀 Vercel Deployment

Deploy your fullstack app to Vercel with just **2 commands**:

### Quick Deployment

```bash
# 1. Build both frontend and backend
npm run build

# 2. Deploy with Vercel CLI
npx vercel
```

### Automatic Deployment
- **GitHub Integration**: Push to GitHub → Auto-deploy to Vercel
- **Build Command**: `npm run build` (configured in vercel.json)
- **Dev Command**: `npm run dev` (for Vercel dev server)

### Environment Variables
Set in Vercel Dashboard:
- `MONGODB_URI` - Your MongoDB connection string

### URLs After Deployment
- **Frontend**: `https://your-app.vercel.app/`
- **Backend API**: `https://your-app.vercel.app/api/`

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide**

## 🔧 Configuration

### Environment Variables

**Backend (.env)**:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend**:
- Configuration is handled through Vite config
- API base URL automatically points to backend

## 🚀 Deployment

### Development Workflow
1. `npm run dev` - Start both servers for development
2. Make changes to frontend or backend
3. Both servers auto-reload on file changes
4. Test using provided API endpoints

### Production Build
1. `npm run build` - Build both applications
2. `npm start` - Start production servers
3. Deploy to your hosting platform

## 🏛️ Architecture

### Frontend (React + Vite)
- **React 19** with modern hooks
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for fast development and building

### Backend (Node.js + Express)
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **Professional folder structure**
- **Rate limiting** and security middleware
- **Comprehensive error handling**

### API Features
- RESTful API design
- Session-based cart persistence
- Product management
- Real-time cart synchronization
- Rate limiting and CORS protection

## 📊 Features

### ✅ Implemented Features
- **Product Catalog**: Browse products by category
- **Shopping Cart**: Add, update, remove items
- **Cart Persistence**: Cart saved across browser sessions
- **Responsive Design**: Works on desktop and mobile
- **Search & Filter**: Find products easily
- **Real-time Updates**: Cart syncs automatically
- **Professional API**: Rate-limited, secure endpoints

### 🔄 Development Features
- **Hot Reload**: Both frontend and backend auto-reload
- **Database Tools**: Seed, clear, validate data
- **API Documentation**: Built-in endpoint documentation
- **Request Logging**: Track all API usage
- **Error Handling**: Comprehensive error management

## 🛡️ Security Features

- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Request validation on all endpoints
- **Error Sanitization**: Safe error responses
- **Session Management**: Secure cart persistence

## 📈 Performance

- **Frontend**: Vite for fast builds and HMR
- **Backend**: Express with optimized middleware stack
- **Database**: Indexed collections for fast queries
- **Caching**: Proper cache headers
- **Compression**: Efficient data transfer

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run individual test suites
npm run test:frontend
npm run test:backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly using `npm run dev`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Kill processes on ports 5000 and 5173
npx kill-port 5000 5173
npm run dev
```

**Database connection issues**:
- Check MongoDB URI in backend/.env
- Ensure database is running
- Verify network connectivity

**Frontend not connecting to backend**:
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API base URL in frontend

**Dependencies issues**:
```bash
npm run clean
npm run install:all
```

### Debug Mode
Set environment variables for detailed logging:
```bash
# Backend
NODE_ENV=development

# Frontend  
VITE_DEBUG=true
```

## 📞 Support

For issues and questions:
1. Check this README
2. Review API documentation at http://localhost:5000/api
3. Check the issues section
4. Contact the development team

---

**Happy coding! 🚀**