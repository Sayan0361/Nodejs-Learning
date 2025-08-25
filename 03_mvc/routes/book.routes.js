// routes/userRoutes.js
// --------------------
// Routes define API endpoints and call controllers.

const express = require("express");
const router = express.Router();
const { getAllBooks, getBook, createBook, deleteBookById } = require("../controllers/book.controller");


router.get("/getAll", getAllBooks);

router.get("/get/:id", getBook);

router.post("/add", createBook);

router.delete("/delete/:id", deleteBookById);

module.exports = router;
