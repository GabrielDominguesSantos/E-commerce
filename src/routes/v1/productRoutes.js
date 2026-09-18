const express = require('express');
const router = express.Router();
const productControler = require("../../controllers/productController");

router.post('/', productControler.createProduct);
router.get('/', productControler.listProducts);
router.get('/search', productControler.searchProducts);
router.patch('/:id', productControler.updateProduct);
router.delete('/:id', productControler.deleteProduct);

module.exports = router;