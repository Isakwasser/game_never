const Router = require('express');
const router = new Router();
const categoryRouter = require('./categoryRouter');
const questionRouter = require('./questionRouter');
const userRouter = require('./userRouter');

router.use('/category', categoryRouter);
router.use('/question', questionRouter);
router.use('/user', userRouter);

module.exports = router;