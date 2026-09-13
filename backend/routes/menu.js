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
        console.log("⚡ Cache HIT — returning menu from cache!");
        res.status(200).json(cachedMenu);
        return;
    }

    console.log("🔄 Cache MISS — fetching menu from MySQL...");

    // ✅ FIX 1 — changed is_available → is_active
    // OLD DB had: is_available
    // NEW DB has: is_active
    // Also selecting specific columns since new DB has different columns
    const sql = `SELECT 
                    id,
                    item_name,
                    category,
                    package_type,
                    description,
                    image_url,
                    is_veg,
                    is_active
                 FROM menu_items 
                 WHERE is_active = 1
                 ORDER BY category, item_name`;

    db.query(sql, function (err, results) {

        if (err) {
            console.log("❌ Error fetching menu:", err);
            res.status(500).json({ message: "Error fetching menu" });
            return;
        }

        // Save to cache for next requests
        menuCache.set('all_menu_items', results);
        console.log(`✅ ${results.length} menu items cached for 10 mins!`);

        // Send to React
        res.status(200).json(results);
    });
});


// =============================================
// ROUTE 2 — Get menu items by CATEGORY
// GET request — filter by category
// eg: /menu/category/Dessert
// =============================================
router.get('/category/:category', function (req, res) {

    const category = req.params.category;

    const cacheKey = `menu_category_${category}`;
    const cachedCategory = menuCache.get(cacheKey);

    if (cachedCategory) {
        console.log(`⚡ Cache HIT — returning ${category} from cache!`);
        res.status(200).json(cachedCategory);
        return;
    }

    console.log(`🔄 Cache MISS — fetching ${category} from MySQL...`);

    // ✅ FIX 2 — changed is_available → is_active
    const sql = `SELECT 
                    id,
                    item_name,
                    category,
                    package_type,
                    description,
                    image_url,
                    is_veg,
                    is_active
                 FROM menu_items 
                 WHERE category = ? AND is_active = 1
                 ORDER BY item_name`;

    db.query(sql, [category], function (err, results) {

        if (err) {
            res.status(500).json({ message: "Error fetching category" });
            return;
        }

        menuCache.set(cacheKey, results);
        console.log(`✅ ${results.length} items in "${category}" cached!`);

        res.status(200).json(results);
    });
});


// =============================================
// ROUTE 3 — Add new menu item (admin only)
// POST request — admin adds new dish
//
// ✅ FIX 3 — removed price_per_plate (not in new DB)
// New DB columns: item_name, category, package_type,
//                 description, image_url, is_veg
// =============================================
router.post('/add', function (req, res) {

    // ✅ FIX — removed price_per_plate, added image_url + is_veg
    const { item_name, category, package_type, description, image_url, is_veg } = req.body;

    const sql = `INSERT INTO menu_items 
                (item_name, category, package_type, description, image_url, is_veg) 
                VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [item_name, category, package_type || 'All', description, image_url, is_veg ?? 1], 
    function (err, result) {

        if (err) {
            console.log("❌ Error adding menu item:", err);
            res.status(500).json({ message: "Error adding item" });
        } else {
            // Clear cache so new item shows immediately
            menuCache.flushAll();
            console.log("🗑️ Cache cleared after new item added!");
            res.status(200).json({
                message: "✅ Menu item added successfully!",
                itemId: result.insertId
            });
        }
    });
});


// =============================================
// ROUTE 4 — Update menu item (admin only)
// PUT request — admin toggles item active/inactive
//
// ✅ FIX 4 — removed price_per_plate
//            changed is_available → is_active
// =============================================
router.put('/update/:id', function (req, res) {

    const itemId = req.params.id;

    // ✅ FIX — removed price_per_plate, changed is_available → is_active
    const { is_active } = req.body;

    const sql = `UPDATE menu_items 
                SET is_active = ?
                WHERE id = ?`;

    db.query(sql, [is_active, itemId], function (err, result) {

        if (err) {
            console.log("❌ Error updating menu item:", err);
            res.status(500).json({ message: "Error updating item" });
        } else {
            menuCache.flushAll();
            console.log("🗑️ Cache cleared after item updated!");
            res.status(200).json({ message: "✅ Menu item updated!" });
        }
    });
});


// Export router
module.exports = router;
