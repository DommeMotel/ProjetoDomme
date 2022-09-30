const express = require('express');
const db = require('../models/db');
const router = express.Router();

// método de retorno de suítes
router.get('/', (req, res) => {
    const cmd_sql = 'SELECT * FROM tblquarto'
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

// get para suíte específica
router.get('/:id', (req, res) => {
    let idQuarto = req.params.id;
    const cmd_sql = 'SELECT * FROM tblquarto WHERE codigo_quarto = ?';
    db.query(cmd_sql, idQuarto, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: 'não encontrado'
            });
        } else {
            res.status(200).json(rows);
        };
    })
});


// método de adicionar suítes
router.post('/', (req, res) => {
    let dados = req.body;
    const cmd_sql = 'INSERT INTO tblquarto (tituloQuarto, nrQuarto, andarQ, tpQuarto, dsQuarto, codigo_status) VALUES (?, ?, ?, ?, ?, ?)';
    let dados_body = [dados.titulo, dados.numero, dados.andar, dados.tipo, dados.descricao, dados.codigoStatus];
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
    const cmd_sql = 'UPDATE tblquarto SET tituloQuarto = ?, nrQuarto = ?, andarQ = ?, tpQuarto = ?, dsQuarto = ?, codigo_status = ? WHERE codigo_quarto = ?';
    let dados_body = [dados.titulo, dados.numero, dados.andar, dados.tipo, dados.descricao, dados.codigoStatus, id]
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