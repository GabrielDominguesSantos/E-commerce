const express = require('express');
const routes = require('../src/routes/productRoutes');

const app = express();

app.use(express.json());

module.exports = app;