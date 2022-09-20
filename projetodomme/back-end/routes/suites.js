const express = require('express');
const router = express.Router();

// método de retorno de suítes
router.get('/', (req, res) => {
    res.status(200).send({
        mensagem: 'Usando o Get da rota de suites'
    });
});

module.exports = router;