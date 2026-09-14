const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: [true, 'O nome do produto é obrigatório'],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'O preço do produto é obrigatório'],
            min: [0, 'O preço do produto não pode ser negativo'],
        },
        description: {
            type: String,
            trim: true,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);