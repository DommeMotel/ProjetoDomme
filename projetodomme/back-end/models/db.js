const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    database: 'moteldomme',
    user: 'root',
    password: '03159875Ka@'
});

module.exports = db;