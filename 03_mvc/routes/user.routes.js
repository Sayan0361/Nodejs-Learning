// routes/userRoutes.js
// --------------------
// Routes define API endpoints and call controllers.

const express = require("express");
const router = express.Router();
const { getUsers, getUser, addUser } = require("../controllers/user.controller");

// GET /api/users
router.get("/", getUsers);

// GET /api/users/:id
router.get("/:id", getUser);

// POST /api/users
router.post("/", addUser);

module.exports = router;
