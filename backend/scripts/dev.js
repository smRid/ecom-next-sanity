// CLI script for development utilities
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const { seedDatabase, clearDatabase, getDatabaseStats, validateCarts } = require('../utils/devUtils');

const command = process.argv[2];

const runCommand = async () => {
  await connectDB();
  
  switch (command) {
    case 'seed':
      await seedDatabase();
      break;
    case 'clear':
      await clearDatabase();
      break;
    case 'stats':
      await getDatabaseStats();
      break;
    case 'validate':
      await validateCarts();
      break;
    default:
      console.log('📋 Available commands:');
      console.log('   npm run dev:seed     - Seed database with sample data');
      console.log('   npm run dev:clear    - Clear all cart data');
      console.log('   npm run dev:stats    - Show database statistics');
      console.log('   npm run dev:validate - Validate all cart documents');
  }
  
  await mongoose.connection.close();
  process.exit(0);
};

runCommand().catch((error) => {
  console.error('❌ Command failed:', error.message);
  process.exit(1);
});
