const express = require('express');
const app = express();
const productRouter = require('./routes/products-router');
const ordersRouter = require('./routes/orders-router');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message
    }
  });
});



module.exports = app;
