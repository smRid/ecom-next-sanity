const products = require('../data/products');

// Get all products
const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product by ID
const getProductById = (req, res) => {
  try {
    const product = products.find(p => p._id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Get products by category
const getProductsByCategory = (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const categoryProducts = products.filter(p => 
      p.category.toLowerCase() === category
    );
    
    res.status(200).json({
      success: true,
      data: categoryProducts,
      count: categoryProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category',
      error: error.message
    });
  }
};

// Get products by search query
const searchProducts = (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sortBy } = req.query;
    let filteredProducts = [...products];

    // Filter by search query
    if (q) {
      const query = q.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter(product => {
        const price = product.price;
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case 'price-low-to-high':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-to-low':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    res.status(200).json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts
};
