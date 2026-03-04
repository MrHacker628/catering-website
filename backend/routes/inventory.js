// =============================================
// inventory.js — handles all inventory related
// API requests (admin only)
// =============================================

const express = require('express');
const router = express.Router();

// Import database connection
const db = require('../db');

// =============================================
// ROUTE 1 — Add a new inventory item
// POST request — admin adds new stock item
// =============================================
router.post('/add', function(req, res) {

    // Get all values sent from Admin form
    const { item_name, category, quantity, unit, minimum_stock, price_per_unit } = req.body;

    const sql = `INSERT INTO inventory 
                (item_name, category, quantity, unit, minimum_stock, price_per_unit) 
                VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [item_name, category, quantity, unit, minimum_stock, price_per_unit], function(err, result) {

        if (err) {
            console.log("❌ Error adding inventory item:", err);
            res.status(500).json({ message: "Error adding item" });
        } else {
            res.status(200).json({ 
                message: "✅ Item added successfully!",
                itemId: result.insertId
            });
        }
    });
});

// =============================================
// ROUTE 2 — Get ALL inventory items
// GET request — admin views all stock
// =============================================
router.get('/all', function(req, res) {

    const sql = 'SELECT * FROM inventory ORDER BY category';
    // ORDER BY category groups items together
    // eg: all Vegetables together, all Spices together

    db.query(sql, function(err, results) {

        if (err) {
            console.log("❌ Error fetching inventory:", err);
            res.status(500).json({ message: "Error fetching inventory" });
        } else {
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 3 — Get LOW STOCK items only
// GET request — admin sees items below minimum
// This is useful for restocking alerts!
// =============================================
router.get('/lowstock', function(req, res) {

    // WHERE quantity <= minimum_stock
    // gets items that need to be restocked
    const sql = 'SELECT * FROM inventory WHERE quantity <= minimum_stock';

    db.query(sql, function(err, results) {

        if (err) {
            console.log("❌ Error fetching low stock:", err);
            res.status(500).json({ message: "Error fetching low stock items" });
        } else {
            res.status(200).json(results);
        }
    });
});


// =============================================
// ROUTE 4 — Update inventory quantity
// PUT request — admin updates stock quantity
// eg: when new stock arrives or stock is used
// =============================================
router.put('/update/:id', function(req, res) {

    // Get item id from URL
    const itemId = req.params.id;

    // Get new quantity from request body
    const { quantity } = req.body;

    const sql = 'UPDATE inventory SET quantity = ? WHERE id = ?';

    db.query(sql, [quantity, itemId], function(err, result) {

        if (err) {
            console.log("❌ Error updating inventory:", err);
            res.status(500).json({ message: "Error updating inventory" });
        } else {
            res.status(200).json({ message: "✅ Inventory updated successfully!" });
        }
    });
});

// =============================================
// ROUTE 5 — Delete an inventory item
// DELETE request — admin removes an item
// =============================================
router.delete('/delete/:id', function(req, res) {

    const itemId = req.params.id;

    const sql = 'DELETE FROM inventory WHERE id = ?';

    db.query(sql, [itemId], function(err, result) {

        if (err) {
            console.log("❌ Error deleting item:", err);
            res.status(500).json({ message: "Error deleting item" });
        } else {
            res.status(200).json({ message: "✅ Item deleted successfully!" });
        }
    });
});

// Export router
module.exports = router;
