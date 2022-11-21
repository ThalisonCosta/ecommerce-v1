const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const ordersMiddlewares = require('../middlewares/ordersMiddleware');


router.get('/', ordersController.allOrders);
router.get('/:id', ordersController.oneOrder);
router.post('/', ordersMiddlewares.validateProductId, ordersController.createOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
