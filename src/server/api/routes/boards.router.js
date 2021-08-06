const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const boardsController = require('../controllers/boards.controller');

/**
 * @swagger
 * /users/{ID}/boards:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get boards by member ID
 *    description:
 *      Will return the boards in which the member ID matches with the param user ID.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the user to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', async (req, res) => {
  const boardsByMemberId = await boardsController.getBoardsByMemberId(
    req.params.userId,
  );

  return res.json(boardsByMemberId);
});
/**
 * @swagger
 * /users/{userId}/boards/{boardId}/members:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get all members of a specific board
 *    description:
 *      Get all members of a specific board.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The userId of the specific user to get
 *     - in: path
 *       name: boardId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The boardId of the specific board to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 *      404:
 *         Not Found
 *      400:
 *          Bad Request
 */
router.get('/:userId/boards/:boardId/members', async (req, res) => {
  const membersOfBoard = await boardsController.getAllMembers(
    req.params.userId,
    req.params.boardId,
  );
  return res.json(membersOfBoard);
});

module.exports = router;
