// routes/reviews.js
const express = require('express');
const router  = express.Router();
const axios   = require('axios');

const PLACE_ID = 'ChIJQ4R9y-1nyQoRvhi5X_1zxLI';
const API_KEY  = process.env.GOOGLE_MAPS_KEY;

router.get('/google', async function(req, res) {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;

        const response = await axios.get(url);
        const place    = response.data.result;

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json({
            name:               place.name,
            rating:             place.rating,
            total_ratings:      place.user_ratings_total,
            reviews:            place.reviews || [],
        });

    } catch (err) {
        console.log("❌ Reviews fetch error:", err);
        res.status(500).json({ message: "Error fetching reviews" });
    }
});

module.exports = router;