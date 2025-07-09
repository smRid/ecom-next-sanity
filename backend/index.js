const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import configurations and middleware
const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const logger = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(logger); // Request logging
app.use(generalLimiter); // Rate limiting
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// API documentation route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-commerce API',
    version: '1.0.0',
    endpoints: {
      products: {
        'GET /api/products': 'Get all products',
        'GET /api/products/:id': 'Get product by ID',
        'GET /api/products/category/:category': 'Get products by category',
        'GET /api/products/search': 'Search products with filters'
      },
      cart: {
        'GET /api/cart/:sessionId': 'Get cart by session ID',
        'POST /api/cart': 'Create or update cart',
        'DELETE /api/cart/:sessionId': 'Clear cart by session ID',
        'GET /api/cart/all': 'Get all carts (admin)'
      }
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Export the app for Vercel serverless functions
module.exports = app;

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`🚀 E-commerce API listening on port ${port}`);
    console.log(`📖 API Documentation available at http://localhost:${port}/api`);
  });
}