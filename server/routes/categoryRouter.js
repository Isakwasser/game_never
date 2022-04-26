const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, categoryController.create);
router.post('/getAll', authMiddleware, categoryController.getAll);
router.get('/pair', categoryController.getPair);
router.get('/:id', categoryController.getOne);

module.exports = router;