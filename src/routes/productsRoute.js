const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../imageHandler');
const login = require('../middlewares/loginMiddleware');
const productsMiddleware = require('../middlewares/productsMiddleware');

router.get('/', productsController.allProducts);
router.get('/:id', productsController.oneProduct);
router.post('/', login, upload.single('productImage'), productsController.createProduct);
router.patch('/:id', login, productsController.editProduct);
router.delete('/:id', login, productsMiddleware.validateProductId, productsMiddleware.inUse, productsController.deleteProduct);

module.exports = router;
