// Request logging middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get('User-Agent') || '';
  
  console.log(`[${timestamp}] ${method} ${url} - ${userAgent}`);
  
  next();
};

module.exports = logger;
