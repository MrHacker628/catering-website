 // routes/packages.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all packages
router.get('/all', function(req, res) {
    const sql = 'SELECT * FROM packages WHERE is_available = 1';
    db.query(sql, function(err, results) {
        if (err) {
            res.status(500).json({ message: "Error fetching packages" });
            return;
        }
        res.status(200).json(results);
    });
});

// GET single package by id
router.get('/:id', function(req, res) {
    const sql = 'SELECT * FROM packages WHERE id = ?';
    db.query(sql, [req.params.id], function(err, results) {
        if (err) {
            res.status(500).json({ message: "Error fetching package" });
            return;
        }
        res.status(200).json(results[0]);
    });
});

module.exports = router;
