 // =============================================
// customers.js — handles all customer related
// API requests from the frontend (React)
// =============================================

// express.Router() lets us create mini route handlers
// instead of writing everything in server.js
const express = require('express');
const router = express.Router();

// Import database connection from db.js
// so we can run SQL queries here
const db = require('../db');
// '../db' means go ONE folder up (from routes to backend)
// then find db.js


// =============================================
// ROUTE 1 — Add a new customer
// POST means we are SENDING data to the server
// This runs when React sends customer form data
// =============================================

// router.post('/add', function(req, res) {
//     // req.body contains the data sent from React
//     // We destructure it to get individual values
//     const { name, email, phone } = req.body;

//     // SQL query to insert customer into database
//     // ? marks are placeholders — prevents SQL injection attacks
//     const sql = 'INSERT INTO customers (full_name, email, phone, address) VALUES (?, ?, ?, ?)';

//      // db.query runs the SQL query
//     // second argument fills in the ? placeholders in order
//     db.query(sql, [full_name, email, phone, address], function(err, result) {
//         if (err) {
//             console.log("❌ Error adding customer:", err);
//             res.status(500).json({ error: 'Failed to add customer' });
//         }else {
//             // Success — send back the new customer's id
//             res.status(200).json({ 
//                 message: "✅ Customer added successfully!",
//                 customerId: result.insertId // insertId gives the new row's id
//             });
//         }
//     });
// });

router.post('/add', function(req, res) {

    // ADD THIS LINE to see what data is coming from React
    console.log("Data received:", req.body);

    const { full_name, email, phone, address } = req.body;

    // First CHECK if customer with this email already exists
    const checkSql = 'SELECT * FROM customers WHERE email = ?';

    db.query(checkSql, [email], function(err, results) {

        if (err) {
            res.status(500).json({ message: "Error checking customer" });
            return;
        }

        if (results.length > 0) {
            // Customer already exists — just return their id
            // no need to insert again
            res.status(200).json({
                message: "✅ Customer found!",
                customerId: results[0].id
            });

        } else {
            // New customer — insert into database
            const sql = 'INSERT INTO customers (full_name, email, phone, address) VALUES (?, ?, ?, ?)';

            db.query(sql, [full_name, email, phone, address], function(err, result) {

                if (err) {
                    console.log("❌ Error adding customer:", err);
                    res.status(500).json({ message: "Error adding customer" });
                } else {
                    res.status(200).json({
                        message: "✅ Customer added!",
                        customerId: result.insertId
                    });
                }
            });
        }
    });
});

const verifyToken = require('../middleware/auth');

// =============================================
// ROUTE 2 — Get ALL customers (admin only)
// GET means we are FETCHING data from server
// This runs when Admin page loads
// =============================================
router.get('/all', verifyToken, function(req, res) {
    // SQL query to get all customers
    // ORDER BY created_at DESC = newest customer first
    const sql = 'SELECT * FROM customers ORDER BY created_at DESC';

    db.query(sql, function(err, results) {

        if (err) {
            console.log("❌ Error fetching customers:", err);
            res.status(500).json({ message: "Error fetching customers" });
        } else {
            // results is an array of all customer rows
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 3 — Get ONE customer by their id
// :id is a URL parameter — eg: /customers/5
// This runs when customer checks their profile
// =============================================
router.get('/:id', function(req, res) {

    // req.params.id gets the id from the URL
    const customerId = req.params.id;

    const sql = 'SELECT * FROM customers WHERE id = ?';

    db.query(sql, [customerId], function(err, results) {

        if (err) {
            console.log("❌ Error fetching customer:", err);
            res.status(500).json({ message: "Error fetching customer" });
        } else if (results.length === 0) {
            // No customer found with that id
            res.status(404).json({ message: "Customer not found" });
        } else {
            // results[0] gets the first (and only) row
            res.status(200).json(results[0]);
        }
    });
});


// Export router so server.js can use it
module.exports = router;