const Cart = require('../models/Cart');

// Get cart by session ID
const getCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// Create or update cart
const saveCart = async (req, res) => {
  try {
    const { sessionId, products, selectedItems, totalPrice, tax, taxRate, grandTotal } = req.body;
    
    // Validate required fields
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    let cart = await Cart.findOne({ sessionId });
    
    if (cart) {
      // Update existing cart
      cart.products = products || [];
      cart.selectedItems = selectedItems || 0;
      cart.totalPrice = totalPrice || 0;
      cart.tax = tax || 0;
      cart.taxRate = taxRate || 0.05;
      cart.grandTotal = grandTotal || 0;
      await cart.save();
    } else {
      // Create new cart
      cart = new Cart({
        sessionId,
        products: products || [],
        selectedItems: selectedItems || 0,
        totalPrice: totalPrice || 0,
        tax: tax || 0,
        taxRate: taxRate || 0.05,
        grandTotal: grandTotal || 0
      });
      await cart.save();
    }
    
    res.status(200).json({
      success: true,
      data: cart,
      message: cart.isNew ? 'Cart created successfully' : 'Cart updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving cart',
      error: error.message
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    const result = await Cart.deleteOne({ sessionId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};

// Get all carts (for admin purposes)
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().sort({ updatedAt: -1 });
    
    res.status(200).json({
      success: true,
      data: carts,
      count: carts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching carts',
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  saveCart,
  clearCart,
  getAllCarts
};
