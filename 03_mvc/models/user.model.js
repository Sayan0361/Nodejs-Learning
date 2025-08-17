// models/userModel.js
// -------------------
// The "Model" represents data and business logic.
// Here we’ll fake a DB with a simple array for now.

let users = [
  { id: 1, name: "Sayan", email: "sayan@example.com" },
  { id: 2, name: "Amit", email: "amit@example.com" },
];

// Simulating DB methods
const getAllUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const createUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
  return user;
};

module.exports = { getAllUsers, getUserById, createUser };
