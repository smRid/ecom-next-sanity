# E-commerce Backend API

A professional Node.js/Express backend API for an e-commerce application with MongoDB integration.

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   ├── cartController.js    # Cart business logic
│   └── productController.js # Product business logic
├── data/
│   └── products.js          # Product data (temporary - for demo)
├── middleware/
│   ├── cors.js              # CORS configuration
│   ├── errorHandler.js      # Error handling middleware
│   ├── logger.js            # Request logging middleware
│   └── rateLimiter.js       # Rate limiting middleware
├── models/
│   └── Cart.js              # MongoDB Cart model
├── routes/
│   ├── cartRoutes.js        # Cart route definitions
│   └── productRoutes.js     # Product route definitions
├── .env                     # Environment variables
├── index.js                 # Main application entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🚀 Features

### Core Features
- **RESTful API** design with proper HTTP methods
- **MongoDB** integration with Mongoose ODM
- **Rate limiting** to prevent API abuse
- **Error handling** with custom middleware
- **Request logging** for debugging and monitoring
- **CORS** configuration for frontend integration
- **Environment-based** configuration

### API Endpoints

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search` - Search products with filters

#### Cart
- `GET /api/cart/:sessionId` - Get cart by session ID
- `POST /api/cart` - Create or update cart
- `DELETE /api/cart/:sessionId` - Clear cart
- `GET /api/cart/all` - Get all carts (admin endpoint)

#### Utility
- `GET /` - Health check
- `GET /api` - API documentation

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your MongoDB connection string
# Edit .env file with your configuration

# Start development server
npm run dev

# Or start production server
npm start
```

### Environment Variables
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## 📦 Dependencies

### Core Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **cookie-parser** - Cookie parsing middleware
- **body-parser** - Body parsing middleware
- **express-rate-limit** - Rate limiting middleware

### Development Dependencies
- **nodemon** - Development server with auto-reload

## 🔧 Middleware Stack

1. **Logger** - Logs all incoming requests
2. **Rate Limiter** - Prevents API abuse
3. **Body Parser** - Parses JSON and URL-encoded data
4. **Cookie Parser** - Parses cookies
5. **CORS** - Handles cross-origin requests
6. **Error Handler** - Catches and formats errors
7. **404 Handler** - Handles undefined routes

## 🗄️ Database Schema

### Cart Model
```javascript
{
  sessionId: String (required, indexed),
  products: [{
    _id: Number,
    name: String,
    category: String,
    description: String,
    price: Number,
    oldPrice: Number,
    image: String,
    color: String,
    rating: Number,
    quantity: Number (default: 1)
  }],
  selectedItems: Number (default: 0),
  totalPrice: Number (default: 0),
  tax: Number (default: 0),
  taxRate: Number (default: 0.05),
  grandTotal: Number (default: 0),
  createdAt: Date (default: now),
  updatedAt: Date (auto-updated)
}
```

## 🔐 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Cart Rate Limiting**: 30 cart operations per minute per IP
- **CORS Protection**: Configured for specific frontend origin
- **Input Validation**: Request validation in controllers
- **Error Sanitization**: Removes stack traces in production

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message",
  "count": 10 // For list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 🚦 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Cart Operations**: 30 requests per minute per IP
- **Headers**: Rate limit info included in response headers

## 📝 Logging

All requests are logged with:
- Timestamp
- HTTP method
- Request URL
- User agent

Example log entry:
```
[2025-07-10T10:30:45.123Z] GET /api/products - Mozilla/5.0...
```

## 🧪 Testing the API

### Using curl
```bash
# Get all products
curl http://localhost:5000/api/products

# Get product by ID
curl http://localhost:5000/api/products/1

# Create/update cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test123","products":[],"totalPrice":0}'
```

### Using a REST client
Import the following endpoints into Postman or similar:
- Base URL: `http://localhost:5000`
- See API documentation at `http://localhost:5000/api`

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production` in environment
- [ ] Use production MongoDB URI
- [ ] Configure proper frontend URL in CORS
- [ ] Set up process manager (PM2)
- [ ] Configure reverse proxy (Nginx)
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

### Docker Deployment (Optional)
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔧 Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run test    # Run tests (to be implemented)
npm run lint    # Run ESLint (to be implemented)
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include JSDoc comments for functions
4. Test all endpoints before submitting
5. Update documentation for new features

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify MongoDB URI in .env file
- Check network connectivity
- Ensure MongoDB Atlas IP whitelist includes your IP

**CORS Errors**
- Verify FRONTEND_URL in .env matches your frontend URL
- Check that credentials are properly configured

**Rate Limiting Issues**
- Rate limits reset every 15 minutes for general API
- Cart rate limits reset every minute
- Check response headers for rate limit status

### Debug Mode
Set `NODE_ENV=development` to see detailed error messages and stack traces.
