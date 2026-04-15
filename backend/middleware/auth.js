 
// middleware/auth.js
// This runs BEFORE every protected API route
// It checks if the request has a valid JWT token

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // next = "go to the actual route if token is valid"

    // STEP 1 — Get token from request headers
    const authHeader = req.headers.authorization;

    // STEP 2 — Check if token exists
    if (!authHeader) {
        return res.status(401).json({ 
            message: "❌ Access Denied! No token provided." 
        });
    }

    // STEP 3 — Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: "❌ Access Denied! Invalid token format." 
        });
    }

    // STEP 4 — Verify token is valid and not expired
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // STEP 5 — Save user info in request
        req.user = decoded;

        // STEP 6 — Token is valid! Go to actual route
        next();

    } catch (err) {
        return res.status(401).json({ 
            message: "❌ Token expired or invalid! Please login again." 
        });
    }
}

// THIS LINE IS VERY IMPORTANT!
// without this, server.js can't use verifyToken
module.exports = verifyToken;