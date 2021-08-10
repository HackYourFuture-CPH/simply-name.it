const express = require('express');

const router = express.Router({ mergeParams: true });

const candidatesController = require('../controllers/candidates.controller');

router.get('/', async (req, res) => {
  const boardCandidates = await candidatesController.getCandidates(
    req.params.userId,
    req.params.boardId,
  );
  return res.json(boardCandidates);
});

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/candidates:
 *  get:
 *    tags:
 *    - candidates
 *    summary: Get all candidates of a specific board
 *    description:
 *      Get all candidates of a specific board
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *         required: true
 *         description: ID of the specified user
 *     - in: path
 *       name: boardId
 *       schema:
 *         type: integer
 *         required: true
 *         description: ID of the specified board
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error
 *      400:
 *          Invalid ID
 *      404:
 *        description: Invalid entry error
 */
module.exports = router;
