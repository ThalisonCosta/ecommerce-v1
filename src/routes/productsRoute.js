const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.allProducts);
router.get('/:id', productsController.oneProduct);
router.post('/', productsController.createProduct);
router.patch('/:id', productsController.editProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
