const express = require('express');
const router = express.Router();

// método de retorno de suítes
router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Get da rota de suites'
    });
});

// método de adicionar suítes
router.post('/', (req, res) => {
    const suite = {
        nome: req.body.nomeSuite,
        preco: req.body.precoSuite
    }

    res.status(201).send({
        mensagem: 'Suite criada',
        suite: suite
    });
});



// método de alterar suítes
router.put('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Put da rota de suítes'
    });
});


// método de deletar suítes
router.delete('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Delete da rota de suítes'
    });
});


module.exports = router;