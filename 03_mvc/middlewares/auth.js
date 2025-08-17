// auth.js
// Middleware to check if user is authenticated before accessing protected routes.

const auth = (req, res, next) => {
    const token = req.headers['authorization']; // Usually sent as Bearer token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // For now just fake check (later you can verify JWT or session)
    if (token === "mysecrettoken") {
        next(); // Allow request to continue
    } else {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
};

module.exports = auth;
