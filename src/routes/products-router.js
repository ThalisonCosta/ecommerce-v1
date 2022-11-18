const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({ message: 'list all products' });
});

router.post('/', (req, res, next) => {
  res.status(201).send({ message: 'post products' });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({
    message: 'especial product',
    id: id
  });
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(201).send({
    message: `the product with ${id} was modified`
  });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(201).send({
    message: `the product with ${id} has been deleted`
  });
});

module.exports = router;
