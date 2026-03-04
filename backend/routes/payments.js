 // =============================================
// payments.js — handles all payment related
// API requests with Razorpay
// =============================================

const express = require('express');
const router = express.Router();
const db = require('../db');

// Import Razorpay package
const Razorpay = require('razorpay');

// Initialize Razorpay with your keys
// We will get these keys from Razorpay dashboard later
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// =============================================
// ROUTE 1 — Create Razorpay Order
// POST request — called when customer clicks Pay
// This creates a payment order in Razorpay first
// =============================================
router.post('/create-order', async function(req, res) {
    // async means this function can wait for Razorpay response

    const { amount, order_id, customer_id } = req.body;

    // Razorpay needs amount in PAISE (not rupees)
    // 1 Rupee = 100 Paise
    // So multiply amount by 100
    const amountInPaise = amount * 100;

    // Options for Razorpay order
    const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `order_${order_id}`, // unique receipt id
        notes: {
            order_id: order_id,
            customer_id: customer_id
        }
    };

    try {
        // Create order in Razorpay
        // await means wait until Razorpay responds
        const razorpayOrder = await razorpay.orders.create(options);

        // Save payment record in our database with 'pending' status
        const sql = `INSERT INTO payments 
                    (order_id, customer_id, razorpay_order_id, amount, payment_status) 
                    VALUES (?, ?, ?, ?, 'pending')`;

        db.query(sql, [order_id, customer_id, razorpayOrder.id, amount], function(err, result) {

            if (err) {
                console.log("❌ Error saving payment:", err);
                res.status(500).json({ message: "Error saving payment" });
            } else {
                // Send Razorpay order details back to React
                // React needs these to open the payment popup
                res.status(200).json({
                    message: "✅ Payment order created!",
                    razorpay_order_id: razorpayOrder.id,
                    amount: amount,
                    currency: 'INR'
                });
            }
        });

    } catch (err) {
        console.log("❌ Razorpay error:", err);
        res.status(500).json({ message: "Error creating payment order" });
    }
});


// =============================================
// ROUTE 2 — Verify payment after customer pays
// POST request — called after payment is done
// Razorpay sends back payment id when successful
// =============================================
router.post('/verify', function(req, res) {

    const { razorpay_order_id, razorpay_payment_id } = req.body;

    // Update payment status to 'success' in our database
    // and save the razorpay_payment_id we received
    const sql = `UPDATE payments 
                SET payment_status = 'success', 
                razorpay_payment_id = ? 
                WHERE razorpay_order_id = ?`;

    db.query(sql, [razorpay_payment_id, razorpay_order_id], function(err, result) {

        if (err) {
            console.log("❌ Error verifying payment:", err);
            res.status(500).json({ message: "Error verifying payment" });
        } else {
            // Also update order status to 'confirmed'
            const updateOrderSql = `UPDATE orders 
                                   SET order_status = 'confirmed' 
                                   WHERE id = (
                                       SELECT order_id FROM payments 
                                       WHERE razorpay_order_id = ?
                                   )`;

            db.query(updateOrderSql, [razorpay_order_id], function(err2, result2) {

                if (err2) {
                    console.log("❌ Error updating order:", err2);
                } else {
                    res.status(200).json({ 
                        message: "✅ Payment verified! Order confirmed!" 
                    });
                }
            });
        }
    });
});


// =============================================
// ROUTE 3 — Get ALL payments (admin only)
// GET request — admin views all transactions
// =============================================
router.get('/all', function(req, res) {

    // JOIN query gets payment details WITH
    // customer name and order event type
    const sql = `SELECT payments.*, 
                customers.full_name,
                orders.event_type,
                orders.event_date
                FROM payments
                INNER JOIN customers ON payments.customer_id = customers.id
                INNER JOIN orders ON payments.order_id = orders.id
                ORDER BY payments.payment_date DESC`;

    db.query(sql, function(err, results) {

        if (err) {
            console.log("❌ Error fetching payments:", err);
            res.status(500).json({ message: "Error fetching payments" });
        } else {
            res.status(200).json(results);
        }
    });
});


// Export router
module.exports = router;
