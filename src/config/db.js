const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Contectado com sucesso!')
    } catch (error) {
        console.log('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;