const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productsRoute');
const ordersRouter = require('./routes/ordersRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Oringin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
    return res.status(200).send({});
  }

  next();
});

app.use('/products', productRouter);
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((error, _req, res) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
