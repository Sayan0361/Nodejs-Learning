// controllers/userController.js
// ------------------------------
// The "Controller" connects Model and View.
// It receives requests, uses model functions, and returns responses.

const User = require("../models/user.model");

// GET all users
const getUsers = (req, res) => {
  const users = User.getAllUsers();
  res.json(users);
};

// GET a single user
const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = User.getUserById(id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// POST create user
const addUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = User.createUser({ name, email });
  res.status(201).json(newUser);
};

module.exports = { getUsers, getUser, addUser };
