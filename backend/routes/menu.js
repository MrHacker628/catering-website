 // =============================================
// menu.js — handles all menu related
// API requests
// =============================================

const express = require('express');
const router = express.Router();

// Import database connection
const db = require('../db');


// =============================================
// ROUTE 1 — Get ALL menu items
// GET request — React menu page loads all items
// =============================================
router.get('/all', function(req, res) {

    // Get all available menu items
    // WHERE is_available = 1 means only show active items
    // 1 = TRUE, 0 = FALSE in MySQL boolean
    const sql = `SELECT * FROM menu_items 
                WHERE is_available = 1 
                ORDER BY category`;

    db.query(sql, function(err, results) {

        if (err) {
            console.log("❌ Error fetching menu:", err);
            res.status(500).json({ message: "Error fetching menu" });
        } else {
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 2 — Get menu items by CATEGORY
// GET request — filter by category
// eg: /menu/category/Biryani
// =============================================
router.get('/category/:category', function(req, res) {

    // Get category from URL
    const category = req.params.category;

    const sql = `SELECT * FROM menu_items 
                WHERE category = ? AND is_available = 1`;

    db.query(sql, [category], function(err, results) {

        if (err) {
            console.log("❌ Error fetching category:", err);
            res.status(500).json({ message: "Error fetching category" });
        } else {
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 3 — Add new menu item (admin only)
// POST request — admin adds new dish
// =============================================
router.post('/add', function(req, res) {

    const { item_name, category, description, price_per_plate } = req.body;

    const sql = `INSERT INTO menu_items 
                (item_name, category, description, price_per_plate) 
                VALUES (?, ?, ?, ?)`;

    db.query(sql, [item_name, category, description, price_per_plate], function(err, result) {

        if (err) {
            console.log("❌ Error adding menu item:", err);
            res.status(500).json({ message: "Error adding item" });
        } else {
            res.status(200).json({ 
                message: "✅ Menu item added successfully!",
                itemId: result.insertId
            });
        }
    });
});


// =============================================
// ROUTE 4 — Update menu item price (admin only)
// PUT request — admin changes price of a dish
// =============================================
router.put('/update/:id', function(req, res) {

    const itemId = req.params.id;
    const { price_per_plate, is_available } = req.body;

    const sql = `UPDATE menu_items 
                SET price_per_plate = ?, is_available = ? 
                WHERE id = ?`;

    db.query(sql, [price_per_plate, is_available, itemId], function(err, result) {

        if (err) {
            console.log("❌ Error updating menu item:", err);
            res.status(500).json({ message: "Error updating item" });
        } else {
            res.status(200).json({ message: "✅ Menu item updated!" });
        }
    });
});


// =============================================
// ROUTE 5 — Calculate total price based on
// selected items and number of guests
// POST request — called when customer selects menu
// =============================================
router.post('/calculate', function(req, res) {

    // selected_items = array of menu item ids customer chose
    // num_of_guests = number of people attending
    const { selected_items, num_of_guests } = req.body;

    // selected_items is an array like [1, 3, 5, 8]
    // we need to get prices of all these items
    const sql = `SELECT * FROM menu_items WHERE id IN (?)`;
    // IN (?) with array automatically expands to IN (1, 3, 5, 8)

    db.query(sql, [selected_items], function(err, results) {

        if (err) {
            console.log("❌ Error calculating price:", err);
            res.status(500).json({ message: "Error calculating price" });
        } else {

            // Calculate total price per plate
            // reduce() adds up all prices in the array
            const pricePerPlate = results.reduce(function(total, item) {
                return total + parseFloat(item.price_per_plate);
            }, 0);
            // 0 is the starting value of total

            // Total = price per plate × number of guests
            const totalAmount = pricePerPlate * num_of_guests;

            // Advance = 30% of total (catering standard)
            const advanceAmount = totalAmount * 0.30;

            // Balance = remaining 70%
            const balanceAmount = totalAmount - advanceAmount;

            res.status(200).json({
                selected_items: results,        // list of selected dishes
                price_per_plate: pricePerPlate, // total per person
                num_of_guests: num_of_guests,   // number of guests
                total_amount: totalAmount,       // full bill
                advance_amount: advanceAmount,   // 30% to pay now
                balance_amount: balanceAmount    // 70% to pay later
            });
        }
    });
});


// Export router
module.exports = router;
