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

router.get('/:codigo', (req, res) =>{
    const codigo = req.params.codigo;
const cmd_sql = `SELECT * FROM tblreserva WHERE codigo_reserva = ?`
    db.query(cmd_sql, codigo, (err, reserva) =>{
        if(err){
            res.status(400).send({
                mensagem: 'Não encontrado'
            })
        } else {
            res.status(200).json(reserva)
        };
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