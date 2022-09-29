const express = require('express');
const router = express.Router();
const db = require('../models/db');


// método de retorno de todos as reservas
router.get('/', (req, res) => {
    const cmd_sql = 'SELECT * FROM tblreserva'
    db.query(cmd_sql, (err, rows) => {
        res.status(200).send(rows);
    });
});


// método de adicionar reservas
router.post('/', (req, res) => {
    
});


// método de alterar reservas
router.put('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Put da rota de reservas'
    });
});


// método de deletar reservas
router.delete('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Delete da rota de reservas'
    });
});


module.exports = router; 