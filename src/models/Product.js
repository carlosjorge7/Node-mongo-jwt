const { Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number
});

module.exports = model('Product', productSchema);