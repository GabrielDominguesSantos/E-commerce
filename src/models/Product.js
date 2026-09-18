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
        category: {
            type: String,
            required: [true, 'Informar a categoria do produto é obrigatório'],
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        inStock: {
            type: Number,
            required: [true, 'Informar a quantidade em estoque é obrigatório'],
            min: [0, 'O estoque não pode ser negativo'],
            default: 0,
        },
        specs: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);