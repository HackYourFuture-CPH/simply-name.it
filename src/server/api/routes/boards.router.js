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

module.exports = router;
