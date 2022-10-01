const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


const rotaClientes = require('./routes/clientes');
const rotaSuites = require('./routes/suites');
const rotaReservas = require('./routes/reservas');

app.use(cors());
app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorizathion');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).send({});
    };

    next();
});

app.use('/clientes', rotaClientes);
app.use('/suites', rotaSuites)
app.use('/reservas', rotaReservas)

app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;