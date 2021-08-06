const express = require('express');

const router = express.Router({ mergeParams: true });
const boardsRouter = require('./boards.router');

router.use('/:userId/boards', boardsRouter);
router.use('/:userId/boards/:boardsId/members', boardsRouter);

module.exports = router;
