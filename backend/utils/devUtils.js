// Development utilities and helper functions

const Cart = require('../models/Cart');

/**
 * Seed database with sample cart data
 */
const seedDatabase = async () => {
  try {
    // Clear existing cart data
    await Cart.deleteMany({});
    
    // Create sample cart data
    const sampleCarts = [
      {
        sessionId: 'demo_session_1',
        products: [
          {
            _id: 1,
            name: "Leather Handbag",
            category: "accessories",
            description: "Stylish leather handbag with ample storage space.",
            price: 79.99,
            image: "/src/assets/Product-1.png",
            color: "black",
            rating: 4.5,
            quantity: 2
          }
        ],
        selectedItems: 2,
        totalPrice: 159.98,
        tax: 8.00,
        taxRate: 0.05,
        grandTotal: 167.98
      },
      {
        sessionId: 'demo_session_2',
        products: [
          {
            _id: 3,
            name: "White T-shirt",
            category: "top",
            description: "Comfortable and stylish white T-shirt for everyday wear.",
            price: 89.99,
            image: "/src/assets/Product-3.png",
            color: "white",
            rating: 4.7,
            quantity: 1
          },
          {
            _id: 4,
            name: "Denim Jeans",
            category: "bottom",
            description: "Comfortable and stylish dark blue jeans pant.",
            price: 99.99,
            image: "/src/assets/Product-4.png",
            color: "blue",
            rating: 4.2,
            quantity: 1
          }
        ],
        selectedItems: 2,
        totalPrice: 189.98,
        tax: 9.50,
        taxRate: 0.05,
        grandTotal: 199.48
      }
    ];
    
    await Cart.insertMany(sampleCarts);
    console.log('✅ Database seeded successfully');
    console.log(`📦 Created ${sampleCarts.length} sample carts`);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  }
};

/**
 * Clear all cart data from database
 */
const clearDatabase = async () => {
  try {
    const result = await Cart.deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} carts from database`);
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
  }
};

/**
 * Get database statistics
 */
const getDatabaseStats = async () => {
  try {
    const cartCount = await Cart.countDocuments();
    const recentCarts = await Cart.find().sort({ updatedAt: -1 }).limit(5);
    
    console.log('📊 Database Statistics:');
    console.log(`   Total Carts: ${cartCount}`);
    console.log(`   Recent Activity: ${recentCarts.length} recent carts`);
    
    if (recentCarts.length > 0) {
      console.log('\n📝 Recent Carts:');
      recentCarts.forEach((cart, index) => {
        console.log(`   ${index + 1}. Session: ${cart.sessionId.substring(0, 20)}... | Items: ${cart.selectedItems} | Total: $${cart.grandTotal.toFixed(2)}`);
      });
    }
  } catch (error) {
    console.error('❌ Error getting database stats:', error.message);
  }
};

/**
 * Validate all carts in database
 */
const validateCarts = async () => {
  try {
    const carts = await Cart.find();
    console.log(`🔍 Validating ${carts.length} carts...`);
    
    let validCarts = 0;
    let invalidCarts = 0;
    
    for (const cart of carts) {
      try {
        await cart.validate();
        validCarts++;
      } catch (error) {
        console.log(`❌ Invalid cart ${cart.sessionId}: ${error.message}`);
        invalidCarts++;
      }
    }
    
    console.log(`✅ Validation complete: ${validCarts} valid, ${invalidCarts} invalid carts`);
  } catch (error) {
    console.error('❌ Error validating carts:', error.message);
  }
};

module.exports = {
  seedDatabase,
  clearDatabase,
  getDatabaseStats,
  validateCarts
};
