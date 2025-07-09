const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Use relative path in production (Vercel will handle routing)
  : 'http://localhost:5000/api';

// Generate or get session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Products API
export const productsAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
};

// Cart API
export const cartAPI = {
  // Get cart by session ID
  getCart: async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Save cart
  saveCart: async (cartData) => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          ...cartData
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(`${API_BASE_URL}/cart/${sessionId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export { getSessionId };
