const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddlewares = require('../middlewares/usersMiddleware');

router.post('/create',
  usersMiddlewares.emailFormat,
  usersMiddlewares.userNameFormat,
  usersMiddlewares.userPasswordFormat,
  usersMiddlewares.duplicate,
  usersController.registrate);
router.post('/login',
  usersMiddlewares.emailFormat,
  usersMiddlewares.userPasswordFormat,
  usersMiddlewares.notExists,
  usersController.userLogin);

router.post('/refresh', usersMiddlewares.verifyRefreshToken, usersController.refreshToken);

module.exports = router;
