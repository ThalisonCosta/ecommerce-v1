const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddlewares = require('../middlewares/usersModel');

router.post('/create', usersMiddlewares, usersController.registrate);

module.exports = router;
