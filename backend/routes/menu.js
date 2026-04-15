// =============================================
// menu.js — handles all menu related
// API requests
// =============================================

const express = require('express');
const router = express.Router();

// Import database connection
const db = require('../db');

// import node-cache
const NodeCache = require('node-cache');


// create cache instance
// stdTTL = 600 seconds = 10 minutes
// after 10 minutes cache expires and refreshes from MySQL
const menuCache = new NodeCache({ stdTTL: 600 });

console.log("✅ Menu cache initialized!");

// =============================================
// ROUTE 1 — Get ALL menu items
// GET request — React menu page loads all items
// =============================================
router.get('/all', function (req, res) {

    // STEP 1 — Check if data exists in cache
    const cachedMenu = menuCache.get('all_menu_items');

    if (cachedMenu) {
        // ⚡ Cache HIT — return cached data instantly!
        // No MySQL query needed!
        console.log("⚡ Cache HIT — returning menu from cache!");
        res.status(200).json(cachedMenu);
        return;
    }

    // STEP 2 — Cache MISS — get from MySQL
    console.log("🔄 Cache MISS — fetching menu from MySQL...");

    const sql = 'SELECT * FROM menu_items WHERE is_available = 1';

    db.query(sql, function (err, results) {

        if (err) {
            console.log("❌ Error fetching menu:", err);
            res.status(500).json({ message: "Error fetching menu" });
            return;
        }

        // STEP 3 — Save to cache for next requests
        menuCache.set('all_menu_items', results);
        console.log("✅ Menu saved to cache! Valid for 10 minutes.");

        // STEP 4 — Send to React
        res.status(200).json(results);
    });
});


// =============================================
// ROUTE 2 — Get menu items by CATEGORY
// GET request — filter by category
// eg: /menu/category/Biryani
// =============================================
router.get('/category/:category', function (req, res) {

    const category = req.params.category;

    // check cache for this specific category
    const cacheKey = `menu_category_${category}`;
    const cachedCategory = menuCache.get(cacheKey);

    if (cachedCategory) {
        console.log(`⚡ Cache HIT — returning ${category} from cache!`);
        res.status(200).json(cachedCategory);
        return;
    }

    console.log(`🔄 Cache MISS — fetching ${category} from MySQL...`);

    const sql = 'SELECT * FROM menu_items WHERE category = ? AND is_available = 1';

    db.query(sql, [category], function (err, results) {

        if (err) {
            res.status(500).json({ message: "Error fetching category" });
            return;
        }

        // save to cache
        menuCache.set(cacheKey, results);
        console.log(`✅ ${category} saved to cache!`);

        res.status(200).json(results);
    });
});


// =============================================
// ROUTE 3 — Add new menu item (admin only)
// POST request — admin adds new dish
// =============================================
router.post('/add', function (req, res) {

    const { item_name, category, description, price_per_plate } = req.body;

    const sql = `INSERT INTO menu_items 
                (item_name, category, description, price_per_plate) 
                VALUES (?, ?, ?, ?)`;

    db.query(sql, [item_name, category, description, price_per_plate], function (err, result) {

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
    // clear cache so next request gets fresh data
    menuCache.flushAll();
    console.log("🗑️ Menu cache cleared after new item added!");
});


// =============================================
// ROUTE 4 — Update menu item price (admin only)
// PUT request — admin changes price of a dish
// =============================================
router.put('/update/:id', function (req, res) {

    const itemId = req.params.id;
    const { price_per_plate, is_available } = req.body;

    const sql = `UPDATE menu_items 
                SET price_per_plate = ?, is_available = ? 
                WHERE id = ?`;

    db.query(sql, [price_per_plate, is_available, itemId], function (err, result) {

        if (err) {
            console.log("❌ Error updating menu item:", err);
            res.status(500).json({ message: "Error updating item" });
        } else {
            res.status(200).json({ message: "✅ Menu item updated!" });
        }
    });
    menuCache.flushAll();
    console.log("🗑️ Menu cache cleared after item updated!");
});


// =============================================
// ROUTE 5 — Calculate total price based on
// selected items and number of guests
// POST request — called when customer selects menu
// =============================================
router.post('/calculate', function (req, res) {

    // selected_items = array of menu item ids customer chose
    // num_of_guests = number of people attending
    const { selected_items, num_of_guests } = req.body;

    // selected_items is an array like [1, 3, 5, 8]
    // we need to get prices of all these items
    const sql = `SELECT * FROM menu_items WHERE id IN (?)`;
    // IN (?) with array automatically expands to IN (1, 3, 5, 8)

    db.query(sql, [selected_items], function (err, results) {

        if (err) {
            console.log("❌ Error calculating price:", err);
            res.status(500).json({ message: "Error calculating price" });
        } else {

            // Calculate total price per plate
            // reduce() adds up all prices in the array
            const pricePerPlate = results.reduce(function (total, item) {
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
