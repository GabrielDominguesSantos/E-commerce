const Product = require('../models/Product');

exports.createProduct = async (req,res) => {
    try{
        const { name, category, price, inStock, specs, description } = req.body;

        const newProduct = await Product.create({
            name,
            category,
            price,
            inStock,
            specs,
            description,
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

exports.listProducts = async (req, res) => {
    try {
        const { category, priceMin, priceMax, limit, skip, sort } = req.query;

        const filter = {};

        if (category) {
            filter.category = { $eq: category };
        }

        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        const sortOption = {};
        if (sort === 'price_asc') sortOption.price = 1;
        if (sort === 'price_desc') sortOption.price = -1;

        const parsedLimit = Math.min(Number(limit) || 10, 100);
        const parsedSkip = Number(skip) || 0;

        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort(sortOption)
                .skip(parsedSkip)
                .limit(parsedLimit),
            Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            total,
            limit: parsedLimit,
            skip: parsedSkip,
            data: products,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao listar produtos',
            error: error.message,
        });
    }
}

exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Informe o parametro de busca 'q'",
            });
        }

        // Busca por indice de texto (nome e descricao)
        let products = await Product.find(
            { $text: { $search: q } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });

        // Fallback: se o indice de texto nao encontrar nada (ex: busca parcial
        // dentro de uma palavra), tenta regex parcial case-insensitive
        if (products.length === 0) {
            const regex = new RegExp(q, 'i');
            products = await Product.find({
                $or: [{ name: regex }, { description: regex }],
            });
        }

        res.status(200).json({
            success: true,
            total: products.length,
            data: products,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao buscar produtos',
            error: error.message,
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, description, specs, inStockDelta } = req.body;

        const updateOps = {};

        const setFields = { name, category, price, description, specs };
        const fieldsToSet = Object.fromEntries(
            Object.entries(setFields).filter(([, value]) => value !== undefined)
        );
        if (Object.keys(fieldsToSet).length > 0) {
            updateOps.$set = fieldsToSet;
        }

        // Incremento/decremento atomico do estoque, ex: { "inStockDelta": -3 }
        if (inStockDelta !== undefined) {
            updateOps.$inc = { inStock: Number(inStockDelta) };
        }

        if (Object.keys(updateOps).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nenhum campo valido para atualizar foi enviado',
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateOps, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Produto nao encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Produto atualizado com sucesso!',
            data: updatedProduct,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao atualizar produto',
            error: error.message,
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Produto nao encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Produto removido com sucesso!',
            data: deletedProduct,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erro ao remover produto',
            error: error.message,
        });
    }
}