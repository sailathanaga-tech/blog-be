const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    // Convert _id to id and format dates for frontend compatibility
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Format for frontend compatibility
    const formattedUser = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    res.json(formattedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, name } = req.body;

    if (!username || !email || !name) {
      return res
        .status(400)
        .json({ error: "Username, email, and name are required" });
    }

    // Check if username or email already exists
    const existingUser =
      (await User.findByUsername(username)) || (await User.findByEmail(email));
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const newUser = await User.create({ username, email, name });

    // Format for frontend compatibility
    const formattedUser = {
      id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString(),
    };

    res.status(201).json(formattedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { username, email, name } = req.body;

    if (!username || !email || !name) {
      return res
        .status(400)
        .json({ error: "Username, email, and name are required" });
    }

    // Check if username or email already exists for another user
    const existingUserByUsername = await User.findByUsername(username);
    const existingUserByEmail = await User.findByEmail(email);

    if (
      (existingUserByUsername &&
        existingUserByUsername._id.toString() !== req.params.id) ||
      (existingUserByEmail &&
        existingUserByEmail._id.toString() !== req.params.id)
    ) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const updatedUser = await User.updateById(req.params.id, {
      username,
      email,
      name,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Format for frontend compatibility
    const formattedUser = {
      id: updatedUser._id.toString(),
      username: updatedUser.username,
      email: updatedUser.email,
      name: updatedUser.name,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString(),
    };

    res.json(formattedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteById(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Format for frontend compatibility
    const formattedUser = {
      id: deletedUser._id.toString(),
      username: deletedUser.username,
      email: deletedUser.email,
      name: deletedUser.name,
      createdAt: deletedUser.createdAt.toISOString(),
      updatedAt: deletedUser.updatedAt.toISOString(),
    };

    res.json({ message: "User deleted successfully", user: formattedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
