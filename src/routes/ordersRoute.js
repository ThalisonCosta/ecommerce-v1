const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const validateProductId = require('../middlewares/ordersMiddleware');
const login = require('../middlewares/loginMiddleware');

router.get('/', ordersController.allOrders);
router.get('/user', login, ordersController.userOrder);
router.get('/:id', ordersController.oneOrder);
router.post('/', login, validateProductId, ordersController.createOrder);
router.delete('/:id', login, ordersController.deleteOrder);

module.exports = router;
