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
router.post('/add', function(req, res) {

    // Get all values sent from Booking form in React
    const { 
        customer_id, 
        event_type, 
        event_date, 
        event_location, 
        num_of_guests, 
        menu_selected, 
        total_amount, 
        advance_amount 
    } = req.body;

    // Calculate balance amount automatically
    // balance = total - advance paid
    const balance_amount = total_amount - advance_amount;

    const sql = `INSERT INTO orders 
                (customer_id, event_type, event_date, event_location, 
                num_of_guests, menu_selected, total_amount, 
                advance_amount, balance_amount) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        customer_id, event_type, event_date, event_location,
        num_of_guests, menu_selected, total_amount,
        advance_amount, balance_amount
    ], function(err, result) {

        if (err) {
            console.log("❌ Error placing order:", err);
            res.status(500).json({ message: "Error placing order" });
        } else {
            res.status(200).json({ 
                message: "✅ Order placed successfully!",
                orderId: result.insertId // send back order id for payment
            });
        }
    });
});


// =============================================
// ROUTE 2 — Get ALL orders (admin only)
// GET request — admin views all bookings
// JOIN combines orders with customer names
// =============================================
router.get('/all', function(req, res) {

    // JOIN query — gets order details WITH customer name
    // Instead of just showing customer_id, we show their name
    // INNER JOIN matches orders.customer_id with customers.id
    const sql = `SELECT orders.*, customers.full_name, customers.phone 
                FROM orders 
                INNER JOIN customers ON orders.customer_id = customers.id
                ORDER BY orders.created_at DESC`;

    db.query(sql, function(err, results) {

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
router.get('/customer/:customer_id', function(req, res) {

    const customerId = req.params.customer_id;

    const sql = `SELECT * FROM orders 
                WHERE customer_id = ? 
                ORDER BY created_at DESC`;

    db.query(sql, [customerId], function(err, results) {

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
router.put('/status/:id', function(req, res) {

    const orderId = req.params.id;

    // order_status can be:
    // 'pending' / 'confirmed' / 'completed' / 'cancelled'
    const { order_status } = req.body;

    const sql = 'UPDATE orders SET order_status = ? WHERE id = ?';

    db.query(sql, [order_status, orderId], function(err, result) {

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
