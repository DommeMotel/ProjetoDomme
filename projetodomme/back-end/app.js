const express = require('express');
const app = express();

const rotaClientes = require('./routes/clientes');
const rotaSuites = require('./routes/suites');
const rotaReservas = require('./routes/reservas');

app.use('/clientes', rotaClientes);
app.use('/suites', rotaSuites)
app.use('/reservas', rotaReservas)

module.exports = app;