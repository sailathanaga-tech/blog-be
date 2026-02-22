const Post = require("../models/Post");
const { ObjectId } = require("mongodb");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();

    // Convert _id to id and format dates for frontend compatibility
    const formattedPosts = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    if (error.message.includes("Database not initialized")) {
      res.json([]); // Return empty array if database not connected
    } else {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid post ID format" });
    }

    const post = await Post.findById(new ObjectId(req.params.id));

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Format for frontend compatibility
    const formattedPost = {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    res.json(formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    if (error.message.includes("Database not initialized")) {
      res.status(503).json({ error: "Database not available" });
    } else {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ error: "Title, content, and author are required" });
    }

    const newPost = await Post.create({ title, content, author });

    // Format for frontend compatibility
    const formattedPost = {
      id: newPost._id.toString(),
      title: newPost.title,
      content: newPost.content,
      author: newPost.author,
      createdAt: newPost.createdAt.toISOString(),
      updatedAt: newPost.updatedAt.toISOString(),
    };

    res.status(201).json(formattedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ error: "Title, content, and author are required" });
    }

    const updatedPost = await Post.updateById(new ObjectId(req.params.id), {
      title,
      content,
      author,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Format for frontend compatibility
    const formattedPost = {
      id: updatedPost._id.toString(),
      title: updatedPost.title,
      content: updatedPost.content,

      author: updatedPost.author,
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };

    res.json(formattedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.deleteById(new ObjectId(req.params.id));

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Format for frontend compatibility
    const formattedPost = {
      id: deletedPost._id.toString(),
      title: deletedPost.title,
      content: deletedPost.content,
      author: deletedPost.author,
      createdAt: deletedPost.createdAt.toISOString(),
      updatedAt: deletedPost.updatedAt.toISOString(),
    };

    res.json({ message: "Post deleted successfully", post: formattedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
