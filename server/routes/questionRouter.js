const Router = require('express');
const router = new Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',);
router.get('/getAll', authMiddleware, questionController.getAll);
router.get('/:id', questionController.getOne);

module.exports = router;