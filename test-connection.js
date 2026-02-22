require('dotenv').config();
const { connectDB } = require('./config/database');

console.log('Testing database connection...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'NOT SET');

connectDB().then(() => {
  console.log('Database connected successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('Database connection failed:', error.message);
  process.exit(1);
});
