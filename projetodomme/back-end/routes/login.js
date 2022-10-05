const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.post('/logando', (req, res) =>{
    let dados = req.body;
    let dados_body = [dados.loginFuncionario, dados.senha]
    const cmd_sql = 'SELECT * FROM tblLogin where loginFuncionario = ? AND senha = ?'
    db.query(cmd_sql, dados_body,(err, rows) => {
        if(err){
            res.status(400).send({
                mensagem: err
            });
        }
        else if(rows.length > 0){
            res.status(200).send({
                mensagem: 'Login cadastrado, direito ao acesso'
            });
        } else {
            res.status(404).send({
                mensagem: 'Login não encontrado'
            });
        };
    });
})


module.exports = router;