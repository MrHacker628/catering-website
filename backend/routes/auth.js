// =============================================
// auth.js — handles Sign Up and Login
// =============================================

// Import the Express framework to create and manage the backend server and API routes
const express = require('express');
// Create a router to define and manage API routes separately
const router = express.Router();
const db = require('../db');

// Import bcryptjs for password encryption
const bcrypt = require('bcryptjs');

// Import jsonwebtoken for creating login tokens
const jwt = require('jsonwebtoken');

// Secret key for JWT — used to sign and verify tokens
// Keep this SECRET — never share it!
const JWT_SECRET = process.env.JWT_SECRET;

// =============================================
// ROUTE 1 — Sign Up (Create new account)
// POST request — user submits signup form
// =============================================
router.post('/signup', async function (req, res) {
    // Get all values from signup form
    const { fullName: full_name, email, phone, address, password } = req.body;

    // STEP 1 — Check if email already exists
    const checkSql = 'SELECT * FROM users WHERE email = ?';

    db.query(checkSql, [email], async function (err, result) {
        if (err) {
            console.log("❌ Error checking email:", err);
            res.status(500).json({ message: "Sever Error" });
            return;
        }
        if (result.length > 0) {
            // Email already registered!
            res.status(400).json({ message: "Email already registered!" });
            return;
        }

        // STEP 2 — Encrypt the password
        // 10 = salt rounds (how many times to encrypt)
        // more rounds = more secure but slower
        // 10 is the standard safe value
        const hashedPassword = await bcrypt.hash(password, 10);

        // STEP 3 — Save user to database
        // note: we save hashedPassword NOT the original password!
        const sql = 'INSERT INTO users (full_name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)';

        db.query(sql, [full_name, email, phone, address, hashedPassword], function(err, result) {
            if (err) {
                console.log("❌ Error creating account:", err);
                res.status(500).json({ message: "Error creating account" });
                return;
            }

             // STEP 4 — Create JWT token
            // This token will keep user logged in for 30 days
            const token = jwt.sign(// payload — what info to store in token
                { 
                    userId: result.insertId,
                    email: email,
                    full_name: full_name
                },
                JWT_SECRET,   // secret key to sign token
                { expiresIn: '30d' }  // token expires in 30 days
            );

            // Send token and user info back to React
            res.status(200).json({
                message: "Account created successfully!",
                token: token,
                user: {
                    id: result.insertId,
                    email: email,
                    full_name: full_name,
                    phone: phone,
                    address: address
                }
            })
        })
    })
});

// =============================================
// ROUTE 2 — Login (existing user)
// POST request — user submits login form
// =============================================
router.post('/login', function (req, res) {
    const { email, password } = req.body;

    // STEP 1 — Find user by email
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async function(err, results) {

        if (err) {
            console.log("❌ Error finding user:", err);
            res.status(500).json({ message: "Server error" });
            return;
        }

        if (results.length === 0) {
            // No user found with this email
            res.status(400).json({ message: "Email not registered!" });
            return;
        }
         const user = results[0];

         // STEP 2 — Compare password with encrypted one
        // bcrypt.compare checks if password matches hash
        // returns true or false

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Wrong password!" });
            return;
        }

        // STEP 3 — Create JWT token
        // Create a JWT token containing user information for authentication, valid for 30 days
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                full_name: user.full_name
            },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Send token and user info back to React
        res.status(200).json({
            message: "✅ Login successful!",
            token: token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
    });
});


// =============================================
// ROUTE 3 — Get logged in user's profile
// GET request — called when page loads
// checks if token is still valid
// =============================================
router.get('/profile', function(req, res) {
    
    // Token is sent in request headers
    // Authorization: Bearer <token>
    const token = req.headers.authorization?.split(' ')[1];
    // ?. means "if authorization exists, split it"
    // split(' ')[1] gets the token part after "Bearer "

    if (!token) {
        res.status(401).json({ message: "No token found!" });
        return;
    }

     try {
        // Verify token is valid and not expired
        const decoded = jwt.verify(token, JWT_SECRET);

        // Get fresh user data from database
        const sql = 'SELECT id, full_name, email, phone, address FROM users WHERE id = ?';

        db.query(sql, [decoded.userId], function(err, results) {

            if (err || results.length === 0) {
                res.status(404).json({ message: "User not found!" });
                return;
            }

            res.status(200).json(results[0]);
        });

    }catch (err) {
        // Token expired or invalid
        res.status(401).json({ message: "Token expired! Please login again." });
    }

});

module.exports = router;