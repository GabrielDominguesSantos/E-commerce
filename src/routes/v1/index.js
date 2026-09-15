const express = require('express');
const productRoutes = require('./productRoutes');

const router = express.Router();

// Tudo aqui dentro já pertence à v1!
router.use('/products', productRoutes);
// router.use('/users', userRoutes); // Outros recursos da v1

module.exports = router;