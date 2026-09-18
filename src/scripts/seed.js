require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
    {
        name: 'Camiseta Basica Algodao',
        category: 'roupas',
        price: 49.9,
        inStock: 120,
        description: 'Camiseta basica de algodao, confortavel para o dia a dia',
        specs: { tamanho: 'M', cor: 'preta', material: 'algodao' },
    },
    {
        name: 'Jaqueta Corta-Vento',
        category: 'roupas',
        price: 189.9,
        inStock: 35,
        description: 'Jaqueta impermeavel ideal para dias de chuva',
        specs: { tamanho: 'G', cor: 'azul' },
    },
    {
        name: 'Liquidificador Turbo 5 Velocidades',
        category: 'eletrodomesticos',
        price: 259.0,
        inStock: 18,
        description: 'Liquidificador potente com 5 velocidades e jarra de vidro',
        specs: { voltagem: '127V', potencia: '700W' },
    },
    {
        name: 'Micro-ondas 30L',
        category: 'eletrodomesticos',
        price: 899.0,
        inStock: 12,
        description: 'Micro-ondas espacoso com grill e descongelamento rapido',
        specs: { voltagem: '220V', potencia: '1450W', capacidade: '30L' },
    },
    {
        name: 'Notebook Gamer 16GB',
        category: 'eletronicos',
        price: 4599.0,
        inStock: 7,
        description: 'Notebook gamer com 16GB RAM e placa de video dedicada',
        specs: { ram: '16GB', armazenamento: '512GB SSD', processador: 'Ryzen 7' },
    },
    {
        name: 'Fone de Ouvido Bluetooth',
        category: 'eletronicos',
        price: 199.9,
        inStock: 60,
        description: 'Fone sem fio com cancelamento de ruido e bateria de longa duracao',
        specs: { conectividade: 'Bluetooth 5.0', autonomia: '20h' },
    },
];

const runSeed = async () => {
    await connectDB();

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log(`Banco populado com ${products.length} produtos.`);
    await mongoose.connection.close();
    process.exit(0);
};

runSeed().catch((error) => {
    console.error('Erro ao popular o banco:', error);
    process.exit(1);
});
