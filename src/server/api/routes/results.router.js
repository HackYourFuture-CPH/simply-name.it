const express = require('express');

const router = express.Router({ mergeParams: true });

const resultsController = require('../controllers/users.controller');

/**
 * @swagger
 * /users/{USER_ID}/boards/{BOARD_ID}/result:
 *  get:
 *    tags:
 *    - Results
 *    summary: Get results by USER_ID and BOARD_ID
 *    description:
 *      Will return the results of a board created by a certain user.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: USER_ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the board creator
 *     - in: path
 *       name: BOARD_ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the board
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/:userId/boards/:boardId/results', (req, res, next) => {
  resultsController
    .getResultsByBoardId(req.params.userId, req.params.boardId)
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

module.exports = router;
