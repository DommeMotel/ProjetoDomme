const express = require('express');
const router = express.Router();


// método de retorno de todos as reservas
router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Get da rota de reservas'
    });
});


// método de adicionar reservas
router.post('/', (req, res) => {
    res.status(201).send({
        mensagem: 'Usando o Post da rota de reservas'
    });
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