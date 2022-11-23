const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../imageHandler');
const login = require('../middlewares/loginMiddleware');

router.get('/', productsController.allProducts);
router.get('/:id', productsController.oneProduct);
router.post('/', login, upload.single('productImage'), productsController.createProduct);
router.patch('/:id', login, productsController.editProduct);
router.delete('/:id', login, productsController.deleteProduct);

module.exports = router;
