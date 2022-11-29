const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const ordersMiddleware = require('../middlewares/ordersMiddleware');
const login = require('../middlewares/loginMiddleware');

router.get('/', login, ordersController.userOrder);
router.get('/:id', login, ordersController.oneOrder);
router.post('/', login, ordersMiddleware.validateProductId, ordersController.createOrder);
router.delete('/:id', login, ordersMiddleware.validateOrderId, ordersMiddleware.allowed, ordersController.deleteOrder);

module.exports = router;
