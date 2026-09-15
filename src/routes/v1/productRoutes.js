const express = require('express');
const router = express.Router();
const productControler = require("../../controllers/productController");

router.post('/', productControler.createProduct);

module.exports = router;