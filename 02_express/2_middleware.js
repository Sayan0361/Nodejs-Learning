/**
 * Middlewares Explained
 * -------------------------------------
 * Middleware = Functions that run in between request (req) and response (res).
 * They can:
 *   - Modify req/res
 *   - Run logic (auth, logging, validation, etc.)
 *   - End the cycle (send a response)
 *   - Or pass control to the next middleware (using next())
 */

const express = require('express');
const app = express();
const PORT = 8000;

// -------------------- GLOBAL MIDDLEWARES --------------------
// 1. Built-in middleware (parsing JSON body)
app.use(express.json()); 
// 👉 Without this, req.body will be undefined for JSON requests

// 2. Custom logging middleware (runs for every request)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Important: without next(), request will hang
});

// 3. Middleware to add custom header globally
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Express-Middleware');
    next();
});

// -------------------- ROUTES --------------------
app.get('/', (req, res) => {
    res.send("✅ Server is working");
});

/**
 * Fake Database (in-memory)
 */
let books = [
    { id: 1, title: 'Book One', author: 'Author One' },
    { id: 2, title: 'Book Two', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
];

// -------------------- ROUTE-SPECIFIC MIDDLEWARES --------------------

// Middleware that validates if :id param is a number
function validateId(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Bad request: ID must be an integer" });
    req.id = id; // attach id to req object for further use
    next();
}

// Middleware that checks if user is "authorized" (dummy check)
function checkAuth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: "Unauthorized: Token required" });
    if (token !== "secrettoken123") return res.status(403).json({ error: "Forbidden: Invalid token" });
    next();
}

// -------------------- BOOK ROUTES --------------------

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET book by ID (with validateId middleware only for this route)
app.get('/books/:id', validateId, (req, res) => {
    const book = books.find(e => e.id === req.id);
    if (!book) return res.status(404).json({ error: `Not Found: Book with ID ${req.id} does not exist` });
    res.json(book);
});

// POST new book (with checkAuth middleware)
app.post('/books', checkAuth, (req, res) => {
    const { title, author } = req.body;

    if (!title || title === '') return res.status(400).json({ error: "Bad Request: title is required" });
    if (!author || author === '') return res.status(400).json({ error: "Bad Request: author is required" });

    const book = { id: books.length + 1, title, author };
    books.push(book);

    return res.status(201).json({ message: `Book created successfully.`, book });
});

// DELETE a book (multiple middlewares chained)
app.delete('/books/:id', checkAuth, validateId, (req, res) => {
    const bookIndex = books.findIndex(e => e.id === req.id);

    if (bookIndex < 0) return res.status(404).json({ error: `Not Found: Book with ID ${req.id} does not exist` });

    books.splice(bookIndex, 1);

    return res.status(200).json({ message: `Book deleted successfully.` });
});

// -------------------- ERROR HANDLING MIDDLEWARE --------------------
// Special middleware: needs 4 params (err, req, res, next)
app.use((err, req, res, next) => {
    console.error("🔥 Error Middleware Caught:", err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

/**
 * 🔹 Types of Middlewares in Express:
 * 1. Application-level (app.use(...)) -> runs globally
 * 2. Route-specific -> passed directly in route (e.g., checkAuth, validateId)
 * 3. Built-in -> like express.json(), express.static()
 * 4. Error-handling -> app.use((err, req, res, next) => {...})
 * 5. Third-party -> like morgan (logging), cors (cross-origin)
 */
