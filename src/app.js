const express = require('express');
const routesv1 = require('./routes/v1');

const app = express();
app.use(express.json());

app.use('/api/v1', routesv1);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Rota nao encontrada',
    });
});

module.exports = app;