const express = require('express');
const router = express.Router();
const db = require('../models/db');


// método de retorno de todos as reservas
router.get('/', (req, res) => {
const cmd_sql = `SELECT
a.codigo_reserva,
date_format(a.DataEntrada,'%d/%m/%y %T') as "DataEntrada",
date_format(a.DataSaida,'%d/%m/%y %T') as "DataSaida",
a.periodo,
a.quantidadePessoas,
a.vlHora,
a.vlConsumo,
a.vlDano,
a.vlHoraAdicional,
a.vlTotal,
b.cpf,
c.tituloQuarto,
c.tpQuarto,
d.tpPagamento,
e.nmStatus
FROM tblreserva a
INNER JOIN tblCliente b
on a.codigo_cliente = b.codigo_cliente
INNER JOIN tblQuarto c
on a.codigo_quarto = c.codigo_quarto
INNER JOIN tblPagamento d
on a.codigo_pagamento = d.codigo_pagamento
INNER JOIN tblstatus e
on a.codigo_status = e.codigo_status`
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