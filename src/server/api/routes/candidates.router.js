const express = require('express');

const router = express.Router({ mergeParams: true });
const candidatesController = require('../controller/candidates.controller');

router.get('/', async (req, res) => {
  const boardCandidates = await candidatesController.getCandidates(
    req.params.boardId,
    req.params.userId,
  );
  return res.json(boardCandidates);
});

module.exports = router;
