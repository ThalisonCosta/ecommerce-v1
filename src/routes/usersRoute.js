const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddlewares = require('../middlewares/usersModel');

router.post('/create', usersMiddlewares.duplicate, usersController.registrate);
router.post('/login', usersMiddlewares.notExists, usersController.userLogin);

module.exports = router;
