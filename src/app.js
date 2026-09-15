const express = require('express');
const routesv1 = require('./routes/v1');

const app = express();
app.use(express.json());

app.use('/api/v1', routesv1);

module.exports = app;