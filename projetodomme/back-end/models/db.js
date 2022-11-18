const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    database: 'motelv2',
    user: 'root',
    password: '1974B@rros'
});

db.connect((error) => {
    if(error){
        console.log(error);
    } else {
        console.log("Conectado!! Servidor rodando na porta 8000");
    };
});

module.exports = db;