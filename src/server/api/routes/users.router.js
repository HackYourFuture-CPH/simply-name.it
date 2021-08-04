const express = require('express');

const router = express.Router({ mergeParams: true });
const boardsRouter = require('./boards.router');

router.use('/:memberId/boards', boardsRouter);

module.exports = router;
