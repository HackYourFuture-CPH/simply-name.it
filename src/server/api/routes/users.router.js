const express = require('express');

const router = express.Router({ mergeParams: true });
const boardsRouter = require('./boards.router');
const updateBallotsRouter = require('./update-ballots.router');

router.use('/:userId/boards', boardsRouter);
router.use('/:userId/boards/:boardId/ballots', updateBallotsRouter);

module.exports = router;
