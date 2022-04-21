const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

router.post('/create', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);

module.exports = router;