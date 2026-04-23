// =============================================
// server.js — Main backend server file
// =============================================

const express = require('express');
const cors    = require('cors');
require('dotenv').config(); // loads .env variables

const app = express();

const verifyToken = require('./middleware/auth');



// Middleware
app.use(cors());             // allows React frontend to talk to backend
app.use(express.json());     // allows server to read JSON request bodies

// Import database connection
const db = require('./db');

// Public route — no auth needed, anyone can see booked dates
app.get('/orders/booked-dates', function(req, res) {
    db.query(
        `SELECT DATE_FORMAT(event_date, '%Y-%m-%d') AS event_date 
         FROM orders 
         WHERE order_status != 'cancelled'`,
        function(err, results) {
            if (err) return res.status(500).json({ message: "Error fetching dates" });

            // DATE_FORMAT in MySQL gives clean string — no JS timezone conversion needed
            const uniqueDates = [...new Set(results.map(row => row.event_date))];
            res.status(200).json({ bookedDates: uniqueDates });
        }
    );
});


const axios = require('axios');

app.get('/reviews/google', async function(req, res) {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJQ4R9y-1nyQoRvhi5X_1zxLI&fields=name,rating,reviews,user_ratings_total&key=${process.env.GOOGLE_MAPS_KEY}`;
        const response = await axios.get(url);
        res.status(200).json(response.data.result);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
});


// Test route
app.get('/', function (req, res) {
    res.send('Catering Website Backend is Running! 🍽️');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`✅ Server is running on port ${PORT}`);
});


// ── Import and mount all route files ──────────

// Customer routes (protected)
const customerRoutes = require('./routes/customers');
app.use('/customers', verifyToken, customerRoutes);

// Inventory routes (protected)
const inventoryRoutes = require('./routes/inventory');
app.use('/inventory', verifyToken, inventoryRoutes);

// Menu routes (public)
const menuRoutes = require('./routes/menu');
app.use('/menu', menuRoutes);

// Order routes (protected)
const orderRoutes = require('./routes/orders');
app.use('/orders/booked-dates', orderRoutes);
app.use('/orders', verifyToken, orderRoutes);

// Payment routes (protected)
const paymentRoutes = require('./routes/payments');
app.use('/payments', verifyToken, paymentRoutes);

// Auth routes (public — login/signup)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Package routes (public)
const packageRoutes = require('./routes/packages');
app.use('/packages', packageRoutes);

// =============================================
// ✅ NEW — Invoice route (protected)
// Generates PDF bill + sends email
// Called from Payment.jsx after payment success
// =============================================
const invoiceRoutes = require('./routes/invoices');
app.use('/invoices', verifyToken, invoiceRoutes);


