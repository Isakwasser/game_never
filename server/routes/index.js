const Router = require('express');
const router = new Router();
const categoryRouter = require('./categoryRouter');
const questionRouter = require('./questionRouter');

router.use('/category', categoryRouter);
router.use('/question', questionRouter);

module.exports = router;