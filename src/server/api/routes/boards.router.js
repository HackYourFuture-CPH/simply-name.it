const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const boardsController = require('../controllers/boards.controller');

/**
 * @swagger
 * /users/{userId}/boards/{boardId}:
 *  put:
 *    tags:
 *    - Boards
 *    summary: Updates board by the owner
 *    description:
 *      Will update a board by owner
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *
 *      - in: path
 *        name: boardId
 *        required: true
 *        description: Id of the board to update
 *
 *      - in: body
 *        name: board
 *        description: The board to create.
 *        schema:
 *          type: object
 *          required:
 *                - title
 *                - deadline
 *                - banner
 *          properties:
 *                title:
 *                  type: string
 *                deadline:
 *                  type: string
 *                  format: date-time
 *                banner:
 *                  type: blob
 *
 *    responses:
 *      201:
 *        description: Board updated
 *      5XX:
 *        description: Unexpected error.
 */
router.put('/:boardId', (req, res, next) => {
  boardsController
    .editBoard(req.params.boardId, req.body)
    .then(res.status(204))
    .catch(next);
});

module.exports = router;
