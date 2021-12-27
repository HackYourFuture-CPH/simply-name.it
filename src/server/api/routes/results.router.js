const express = require('express');

const router = express.Router({ mergeParams: true });

const resultsController = require('../controllers/results.controller');

/**
 * @swagger
 * /users/{USER_ID}/boards/{BOARD_ID}/results:
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
 *        description: Unexpected error
 *      400:
 *          Invalid Id error
 *      404:
 *        description: Invalid entry error
 */
router.get('/', async (req, res) => {
  const resultsByBoardId = await resultsController.getResultsByBoardId(
    req.params.userId,
    req.params.boardId,
  );

  return res.json(resultsByBoardId);
});

/**
 * @swagger
 * /users/{USER_ID}/boards/{BOARD_ID}/deadlineResults:
 *  get:
 *    tags:
 *    - Results
 *    summary: Get results by deadline
 *    description:
 *      Will return the results of a board by deadline.
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
 *        description: Unexpected error
 *      400:
 *          Invalid Id error
 *      404:
 *        description: Invalid entry error
 */
router.get('/', async (req, res) => {
  const resultsByDeadline = await resultsController.getResultsDeadline(
    req.params.userId,
    req.params.boardId,
  );

  return res.json(resultsByDeadline);
});

module.exports = router;
