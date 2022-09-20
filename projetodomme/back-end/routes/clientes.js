const express = require('express');
const router = express.Router();


// método de retorno de todos os clientes
router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Get da rota de clientes'
    });
});


// método de adicionar clientes
router.post('/', (req, res) => {
    res.status(201).send({
        mensagem: 'Usando o Post da rota de clientes'
    });
});


// método de alterar dados cliente
router.put('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Put da rota de clientes'
    });
});


// método de deletar cliente
router.delete('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Delete da rota de clientes'
    });
});


module.exports = router; 