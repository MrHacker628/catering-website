 // This file connects our Node.js server to MySQL database
 const mysql = require('mysql2'); // Import mysql2 library
 require('dotenv').config(); // loads values from .env file

 // Create the connection using .env values
 const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
