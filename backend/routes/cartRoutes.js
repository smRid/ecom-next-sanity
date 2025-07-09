const express = require('express');
const router = express.Router();
const {
  getCart,
  saveCart,
  clearCart,
  getAllCarts
} = require('../controllers/cartController');

// @route   GET /api/cart/all
// @desc    Get all carts (admin only)
// @access  Private/Admin
router.get('/all', getAllCarts);

// @route   GET /api/cart/:sessionId
// @desc    Get cart by session ID
// @access  Public
router.get('/:sessionId', getCart);

// @route   POST /api/cart
// @desc    Create or update cart
// @access  Public
router.post('/', saveCart);

// @route   DELETE /api/cart/:sessionId
// @desc    Clear cart by session ID
// @access  Public
router.delete('/:sessionId', clearCart);

module.exports = router;
