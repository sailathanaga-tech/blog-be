const { MongoClient } = require('mongodb');

let db;
let client;

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    client = new MongoClient(uri);
    
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    // Get database name from URI or use default
    const dbName = uri.split('/').pop().split('?')[0] || 'blogapp';
    db = client.db(dbName);
    
    // Create indexes for better performance
    await db.collection('posts').createIndex({ createdAt: -1 });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};
