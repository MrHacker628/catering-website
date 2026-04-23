// =============================================
// orders.js — handles all order/booking related
// API requests
// =============================================

const express = require('express');
const router = express.Router();

// Import database connection
const db = require('../db');



// =============================================
// ROUTE 1 — Place a new order (customer)
// POST request — customer submits booking form
// =============================================
router.post('/add', function (req, res) {

    console.log("📦 Incoming order data:", req.body);

    const {
        customer_id,
        event_type,
        event_date,
        event_location,
        num_of_guests,
        package_id,
        menu_selected,
        total_amount,
        advance_amount
    } = req.body;


    // ── VALIDATE guests must be 500 or 600 only (skip for custom menu) ──
    const { is_custom_menu } = req.body;
    const allowedGuests = [500, 600];
    if (!is_custom_menu && !allowedGuests.includes(parseInt(num_of_guests))) {
        return res.status(400).json({
            message: "Number of guests must be either 500 or 600."
        });
    }

    // Calculate balance amount automatically
    const balance_amount = total_amount - advance_amount;

    // STEP 1 — Start transaction
    db.beginTransaction(function (err) {

        if (err) {
            console.log("❌ Transaction start failed:", err);
            res.status(500).json({ message: "Server error" });
            return;
        }

        console.log("🔄 Transaction started!");

        // STEP 2 — Insert order
        const sql = `INSERT INTO orders 
            (customer_id, event_type, event_date, event_location, 
            num_of_guests, package_id, total_amount,      
            advance_amount, balance_amount) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [
            customer_id, event_type, event_date, event_location,
            num_of_guests, package_id, total_amount,
            advance_amount, balance_amount
        ], function (err, result) {

            if (err) {
                console.log("❌ Order insert failed:", err);
                // ❌ Failed — rollback everything!
                db.rollback(function () {
                    console.log("❌ Order insert failed! Rolled back!");
                    res.status(500).json({
                        message: "Error placing order! All changes undone."
                    });
                });
                return;
            }

            console.log("✅ Order inserted! ID:", result.insertId);

            // STEP 3 — Commit (save permanently)
            db.commit(function (err) {

                if (err) {
                    db.rollback(function () {
                        console.log("❌ Commit failed! Rolled back!");
                        res.status(500).json({
                            message: "Failed to complete booking!"
                        });
                    });
                    return;
                }

                // 🎉 SUCCESS!
                console.log("✅ Transaction committed successfully!");
                res.status(200).json({
                    message: "✅ Order placed successfully!",
                    orderId: result.insertId
                });
            });
        });
    });
});

// =============================================
// ROUTE — Get all booked dates (public)
// GET /orders/booked-dates
// Used to show booked dates on home page calendar
// =============================================
router.get('/booked-dates', function (req, res) {
    const sql = `SELECT event_date FROM orders 
                 WHERE order_status != 'cancelled'`;

    db.query(sql, function (err, results) {
        if (err) {
            console.log("❌ Error fetching booked dates:", err);
            return res.status(500).json({ message: "Error fetching dates" });
        }
        // Send just the dates as an array
        const dates = results.map(function (row) {
            return new Date(row.event_date).toISOString().split('T')[0];
        });
        res.status(200).json({ bookedDates: dates });
    });
});


// =============================================
// ROUTE 2 — Get ALL orders (admin only)
// GET request — admin views all bookings
// JOIN combines orders with customer names
// =============================================
router.get('/all', function (req, res) {

    // JOIN query — gets order details WITH customer name
    // Instead of just showing customer_id, we show their name
    // INNER JOIN matches orders.customer_id with customers.id
    const sql = `SELECT orders.*, customers.full_name, customers.phone 
                FROM orders 
                INNER JOIN customers ON orders.customer_id = customers.id
                ORDER BY orders.created_at DESC`;

    db.query(sql, function (err, results) {

        if (err) {
            console.log("❌ Error fetching orders:", err);
            res.status(500).json({ message: "Error fetching orders" });
        } else {
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 3 — Get orders of ONE customer
// GET request — customer sees their own orders
// :customer_id comes from URL eg: /orders/customer/5
// =============================================
router.get('/customer/:customer_id', function (req, res) {

    const customerId = req.params.customer_id;

    const sql = `SELECT * FROM orders 
                WHERE customer_id = ? 
                ORDER BY created_at DESC`;

    db.query(sql, [customerId], function (err, results) {

        if (err) {
            console.log("❌ Error fetching customer orders:", err);
            res.status(500).json({ message: "Error fetching orders" });
        } else {
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 4 — Update order status (admin only)
// PUT request — admin confirms or cancels order
// =============================================
router.put('/status/:id', function (req, res) {

    const orderId = req.params.id;

    // order_status can be:
    // 'pending' / 'confirmed' / 'completed' / 'cancelled'
    const { order_status } = req.body;

    const sql = 'UPDATE orders SET order_status = ? WHERE id = ?';

    db.query(sql, [order_status, orderId], function (err, result) {

        if (err) {
            console.log("❌ Error updating order status:", err);
            res.status(500).json({ message: "Error updating status" });
        } else {
            res.status(200).json({ message: "✅ Order status updated!" });
        }
    });
});





// Export router
module.exports = router;
