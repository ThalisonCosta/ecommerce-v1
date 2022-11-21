const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');


router.get('/', ordersController.allOrders);
router.get('/:id', ordersController.oneOrder);
router.post('/', ordersController.createOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
