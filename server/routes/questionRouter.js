const Router = require('express');
const router = new Router();
const questionController = require('../controllers/questionController');

router.post('/',);
router.get('/', questionController.getAll);
router.get('/:id', questionController.getOne);

module.exports = router;