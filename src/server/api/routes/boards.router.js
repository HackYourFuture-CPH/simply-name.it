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
 *      200:
 *        description: Board updated
 *      5XX:
 *        description: Unexpected error.
 */
router.put('/:boardId', async (req, res) => {
  const editBoard = await boardsController.editBoard(
    req.params.boardId,
    req.body,
  );
  return res.json(editBoard);
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

/**
 * @swagger
 * /users/{ID}/boards/created:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get boards by user ID
 *    description:
 *      Will return the boards which creatorId matches with user Id.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the module to get
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

router.get('/created', async (req, res) => {
  const boardsByCreatorId = await boardsController.getBoardsByCreatorId(
    req.params.userId,
  );

  return res.json(boardsByCreatorId);
});

module.exports = router;
