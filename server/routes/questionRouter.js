const Router = require('express');
const router = new Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, questionController.create);
router.get('/getAll', authMiddleware, questionController.getAll);
router.get('/getOne', questionController.getOne);
router.get('/getToPlay', questionController.getToPlay);

module.exports = router;