const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
    quantity: {
      type: Number,
      default: 1
    }
  }],
  selectedItems: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  taxRate: {
    type: Number,
    default: 0.05
  },
  grandTotal: {
    type: Number,
    default: 0
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
cartSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
