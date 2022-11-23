const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const ordersMiddlewares = require('../middlewares/ordersMiddleware');
const login = require('../middlewares/loginMiddleware');

router.get('/', ordersController.allOrders);
router.get('/:id', ordersController.oneOrder);
router.post('/', login, ordersMiddlewares.validateProductId, ordersController.createOrder);
router.delete('/:id', login, ordersController.deleteOrder);

module.exports = router;
