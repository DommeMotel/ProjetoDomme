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
    const cmd_sql = `INSERT INTO tblreserva (dataEntrada, periodo, quantidadePessoas, vlHora, codigo_cliente, codigo_quarto,codigo_pagamento, codigo_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const dados = req.body;
    const dados_body = [dados.dataEntrada, dados.periodo, dados.qtdPessoas, dados.valorH, dados.id_cliente, dados.quarto,dados.codigo_pagamento, dados.codigo_status];
    db.query(cmd_sql, dados_body, (err, rows)=>{
        if(err){
            res.status(400).send(err);
        } else {
            res.status(201).send({
                mensagem: 'Reserva criada com sucesso'
            });
        };
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