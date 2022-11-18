const express = require('express');
const app = express();
const productRouter = require('./routes/products-router');
const ordersRouter = require('./routes/orders-router');

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

module.exports = app;
