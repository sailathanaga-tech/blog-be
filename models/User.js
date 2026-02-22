const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');

class User {
  static collection() {
    return getDB().collection('users');
  }

  static async findAll() {
    return await this.collection().find({}).sort({ createdAt: -1 }).toArray();
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }

  static async findByEmail(email) {
    return await this.collection().findOne({ email });
  }

  static async findByUsername(username) {
    return await this.collection().findOne({ username });
  }

  static async create(userData) {
    const result = await this.collection().insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return await this.findById(result.insertedId);
  }

  static async updateById(id, updateData) {
    await this.collection().updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    
    return await this.findById(id);
  }

  static async deleteById(id) {
    const user = await this.findById(id);
    if (!user) return null;
    
    await this.collection().deleteOne({ _id: new ObjectId(id) });
    return user;
  }
}

module.exports = User;
