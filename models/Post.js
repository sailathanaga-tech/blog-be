const { getDB } = require('../config/database');

class Post {
  static collection() {
    return getDB().collection('posts');
  }

  static async findAll() {
    return await this.collection().find({}).sort({ createdAt: -1 }).toArray();
  }

  static async findById(id) {
    return await this.collection().findOne({ _id: id });
  }

  static async create(postData) {
    const result = await this.collection().insertOne({
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return await this.findById(result.insertedId);
  }

  static async updateById(id, updateData) {
    await this.collection().updateOne(
      { _id: id },
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
    const post = await this.findById(id);
    if (!post) return null;
    
    await this.collection().deleteOne({ _id: id });
    return post;
  }
}

module.exports = Post;
