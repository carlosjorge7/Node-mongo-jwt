const express = require('express');
const morgan = require('morgan');
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/users', require('./controllers/auth.controller'));
app.use('/products', require('./controllers/products.controller'));

module.exports = app;