const express = require('express');

const router = express.Router({ mergeParams: true });
const updateBoardsRouter = require('./update-boards.router');

router.use('/:memberId/boards', updateBoardsRouter);

module.exports = router;
