 // Main server file — this starts our backend
 const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const verifyToken = require('./middleware/auth');

// Middleware
app.use(cors());        // allows React frontend to talk to this server
app.use(express.json()); // allows server to read JSON data

// Import database connection
const db = require('./db');


// Test route — just to check server is working
app.get('/', function(req, res) {
    res.send('Catering Website Backend is Running! 🍽️');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`✅ Server is running on port ${PORT}`);
});


// Import all route files
const customerRoutes = require('./routes/customers');

// Use the routes
// This means all customer routes start with /customers
// eg: /customers/add , /customers/all
app.use('/customers', verifyToken, customerRoutes);


// Import inventory routes
const inventoryRoutes = require('./routes/inventory');

// Use inventory routes
// all inventory routes start with /inventory
app.use('/inventory', verifyToken, inventoryRoutes);


// Import menu routes
const menuRoutes = require('./routes/menu');

// Use menu routes
app.use('/menu', menuRoutes);


// Import orders routes
const orderRoutes = require('./routes/orders');

// Use orders routes
app.use('/orders', verifyToken, orderRoutes);


// Import payment routes
const paymentRoutes = require('./routes/payments');

// Use payment routes
app.use('/payments', verifyToken,paymentRoutes);


// Import auth routes
const authRoutes = require('./routes/auth');
// Use auth routes
app.use('/auth', authRoutes);


const packageRoutes = require('./routes/packages');
// packages are public — no token needed
app.use('/packages', packageRoutes);