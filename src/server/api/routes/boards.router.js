const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const boardsController = require('../controllers/boards.controller');

/**
 * @swagger
 * /users/{ID}/boards:
 *  post:
 *    tags:
 *    - Boards
 *    summary: Create a board
 *    description:
 *      Will create a new board.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the user.
 *      - in: body
 *        name: board
 *        description: The board to create.
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - deadline
 *            - isDeleted
 *          properties:
 *            title:
 *              type: string
 *            deadline:
 *              type: string
 *              format: date-time
 *            isDeleted:
 *              type: boolean
 *            banner:
 *              type: binary
 *    responses:
 *      201:
 *        description: Board created
 *      5XX:
 *        description: Unexpected error.
 */

router.post('/', async (req, res) => {
  const newBoard = await boardsController.createBoard(
    req.params.userId,
    req.body,
  );

  return res.json(newBoard);
});

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

module.exports = router;
