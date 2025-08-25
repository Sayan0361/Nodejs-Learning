/**
 * ---------------- MVC Pattern ----------------
 * M = Model (data, database logic)
 * V = View   (response formatting, static files and frontend)
 * C = Controller (business logic, connects Model & View, backend stuff)
 * 
 * in production → we separate into /models, /controllers, /routes, /views
 * 
 * Client hits /api/users → Middleware -> Route → Controller → Model → Response.
 * MVC ensures separation of concerns
 * 
 * project/
│── package.json
│── server.js          # Entry point (starts express server)
│
├── config/            # Database / config setup
│    └── db.js
│
├── controllers/       # Handles request logic
│    └── userController.js
│
├── models/            # Data schema (DB)
│    └── userModel.js
│
├── routes/            # API routes
│    └── userRoutes.js
│
├── views/             # (Optional) Templates (if using ejs/pug)
│    └── index.ejs
│
└── utils/             # Helper functions (optional)
    └── logger.js
 */

require("dotenv/config")
const express = require("express");
const bookRoutes = require("./routes/book.routes");
const authorRoutes = require("./routes/author.routes");
const logger = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Built-in middleware
app.use(express.json());

// Custom middlewares
app.use(logger); // logs every request


// Routes
app.get("/",(req,res)=>{
    res.send("Your server is working 👨‍💻")
})

app.use("/books", bookRoutes); // basic routes
app.use("/authors", authorRoutes); // basic routes
// app.use("/api/secure", auth, bookRoutes); // secure routes with auth middleware

// Use error handling middleware (keep it last)
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
