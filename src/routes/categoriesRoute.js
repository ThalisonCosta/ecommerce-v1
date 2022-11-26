const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.allCategories);
router.get('/:id', categoriesController.productsByCategory);

module.exports = router;
