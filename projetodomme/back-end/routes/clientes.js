const express = require('express');
const db = require('../models/db');
const router = express.Router();




// método de retorno de todos os clientes
router.get('/', (req, res) => {
    const cmd_sql = 'select codigo_cliente, nmCliente, CPF, date_format(dtNascimento,"%d/%m/%y") as "dtNascimento",  sexo, cep, nmRua, nrEndereco, nmCidade,nrTelefone from tblCliente';
    db.query(cmd_sql, (err, rows) => {
        res.status(200).send(rows);
    });
});


// método de busca de cliente específico
router.get('/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const cmd_sql = 'select codigo_cliente, nmCliente, CPF, date_format(dtNascimento,"%d/%m/%y") as "dtNascimento",  sexo, cep, nmRua, nrEndereco, nmCidade,nrTelefone from tblCliente WHERE CPF = ?'
    db.query(cmd_sql, cpf, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: err
            });
        } else if(rows.length === 0){
            res.status(400).send({
                mensagem: 'Não encontrado'
            })
        } else {
            res.status(200).json(rows)
        };
    });
    
});

router.get('/id/:id', (req, res) => {
    const id = req.params.id;
    const cmd_sql = 'select * from tblCliente WHERE codigo_cliente = ?'
    db.query(cmd_sql, id, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: err
            });
        } else if(rows.length === 0){
            res.status(400).send({
                mensagem: 'Não encontrado'
            })
        } else {
            res.status(200).json(rows)
        };
    });
    
});

// método de adicionar clientes
router.post('/', async (req, res) => {
    let dados = req.body;
    let dados_body = [dados.nome, dados.cpf, dados.sexo, dados.dtNasc, dados.cidade, dados.rua, dados.numero, dados.cep, dados.telefone]
    const cmd_sql = 'INSERT INTO tblcliente (nmCliente, CPF, sexo, dtNascimento, nmCidade, nmRua, nrEndereco, cep, nrTelefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(cmd_sql, dados_body,(err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: err
            });
        } else {
            res.status(200).send({
                mensagem: 'cadastrado com sucesso'
            });
        };
    });
});


// método de alterar dados cliente
router.put('/:id', (req, res) => {
    let dados = req.body;
    let id = req.params.id;
    const cmd_sql = 'UPDATE tblcliente SET nmCliente =?, CPF = ?,nrTelefone = ?, cep =?, nmCidade = ?, nmRua = ?, nrEndereco = ? WHERE codigo_cliente = ?';
    let dados_body = [dados.nome, dados.cpf, dados.telefone, dados.cep, dados.cidade, dados.rua, dados.numero, id]
    db.query(cmd_sql, dados_body, (err, rows) =>{
        if(err){
            res.status(400).send({
                mensagem: err
            });
        } else {
            res.status(200).send({
                mensagem: 'Atualizado com sucesso',
            });
        };
    });
});


// método de deletar cliente
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    const cmd_sql = 'DELETE FROM tblcliente WHERE codigo_cliente = ?'

    db.query(cmd_sql, id, (err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: 'Cliente não excluido'
            });
        }else{
            res.status(201).send({
                mensagem: 'Cliente excluído com sucesso'
            });
        };
    })
});


module.exports = router; 