const { Router } = require('express');
const router = Router();

const Product = require('../models/Product');

router.post('/new-product', async (req, res) => {
    const { name, description, price } = req.body;
    const product = new Product({
        name: name,
        description: description,
        price: price
    });
    console.log(product);
    await product.save();
    res.json({message: 'Producto guardado'})
});

module.exports = router;