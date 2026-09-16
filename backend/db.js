 // This file connects our Node.js server to MySQL database
 const mysql = require('mysql2'); // Import mysql2 library
 require('dotenv').config(); // loads values from .env file

 // Create the connection using .env values
 //
 // DB_PORT defaults to MySQL's standard 3306 — only needed as an explicit
 // env var for hosts like Aiven that assign a custom port.
 //
 // DB_SSL is opt-in (set DB_SSL=true) for hosted providers like Aiven that
 // require an encrypted connection — local MySQL doesn't need this, so it's
 // left off by default rather than breaking local dev.
 const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
});

// Test if connection works
db.connect(function(err) {
    if (err) {
        console.log("❌ Database connection failed:", err);
    } else {
        console.log("✅ MySQL Connected Successfully!");
    }
});

// Export so other files can use this connection
module.exports = db;
