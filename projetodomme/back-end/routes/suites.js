const express = require('express');
const db = require('../models/db');
const router = express.Router();

// método de retorno de suítes
router.get('/', (req, res) => {
    const cmd_sql = `SELECT codigo_quarto, tituloQuarto, nrQuarto, tpQuarto, vlHoraQ, b.nmStatus FROM tblQuarto a inner join tblStatus b on a.codigo_status = b.codigo_status`;
    db.query(cmd_sql, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: 'não encontrado'
            });
        } else {
            res.status(200).json(rows);
        };
    });
});

// get para suíte específica por codigo
router.get('/:id', (req, res) => {
    let idQuarto = req.params.id;
    const cmd_sql = 'SELECT * FROM tblquarto WHERE codigo_quarto = ?';
    db.query(cmd_sql, idQuarto, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: 'não encontrado'
            });
        } else if(rows.length === 0) {
            res.status(400).send({
                mensagem: 'Não encontrado'
            });
        } else {
            res.status(200).json(rows);
        };
    });
});


// filtrando suite por status
router.get('/status/:status', (req, res) => {
    let status = req.params.status;
    const cmd_sql = "SELECT * FROM tblquarto WHERE codigo_status = ?";
    db.query(cmd_sql, status, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: 'Suite não encontrada'
            });
        } else {
            res.status(200).json(rows)
        };
    });
});


// método de adicionar suítes
router.post('/', async (req, res) => {
    let dados = req.body;
    const cmd_sql = 'INSERT INTO tblquarto (tituloQuarto, nrQuarto, tpQuarto, vlHoraQ, codigo_status) VALUES (?, ?, ?, ?, ?)';
    let dados_body = [dados.nome, dados.numero, dados.categoria, dados.valorHora, dados.status];
    db.query(cmd_sql, dados_body, (err, rows) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send({
                mensagem: 'Quarto cadastrado com sucesso'
            });
        };
    });
});



// método de alterar suítes
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let dados = req.body;
    let dados_body = [dados.titulo, dados.numero, dados.tipo, dados.valor, id];
    const cmd_sql = 'UPDATE tblquarto SET tituloQuarto = ?, nrQuarto = ?, tpQuarto = ?, vlHoraQ = ? WHERE codigo_quarto = ?';
    db.query(cmd_sql, dados_body, (err, rows) => {
        if(err){
            res.status(400).send(err)
        } else {
            res.status(200).json({
                mensagem: 'Quarto alterado com sucesso'
            });
        };
    });
});


// método de deletar suítes
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const cmd_sql = 'DELETE FROM tblquarto WHERE codigo_quarto = ?'
    db.query(cmd_sql, id, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: 'Quarto não excluído'
            });
        } else {
            res.status(200).send({
                mensagem: 'Quarto excluído com sucesso'
            });
        };
    });
});


module.exports = router;