const Product = require('../models/Product');

exports.createProduct = async (req,res) => {
    try{
        const { name, price, description, inStock } = req.body;

        const newProduct = await Product.create({
            name,
            price,
            description,
            inStock,
        });

        res.status(201).json({
            success: true,
            message: 'Produto criado com sucesso!',
            data: newProduct,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao cadastrar produto',
            error: error.message,
        })
    }
}