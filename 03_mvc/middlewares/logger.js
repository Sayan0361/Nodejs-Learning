// logger.js
// This middleware logs every request coming into our server.

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pass control to next middleware/route
};

module.exports = logger;
