const express = require('express');

const router = express.Router({ mergeParams: true });

// Router imports
const ballotsRouter = require('./ballots.router');
const candidatesRouter = require('./candidates.router');

const resultsRouter = require('./results.router');

router.use('/:boardId/results', resultsRouter);

// controllers
const boardsController = require('../controllers/boards.controller');

router.use('/:boardId/candidates', candidatesRouter);

/**
 * @swagger
 * /users/{userId}/boards/{boardId}:
 *  delete:
 *    tags:
 *    - boards
 *    summary: Delete a board
 *    description:
 *      Will delete a board with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: ID of the user.
 *      - in: path
 *        name: boardId
 *        description: ID of the board to delete.
 *
 *    responses:
 *      200:
 *        description: Board deleted
 *      5XX:
 *        description: Unexpected error.
 */
router.delete('/:boardId', async (req, res) => {
  const deleteBoards = await boardsController.deleteBoardsById(
    req.params.userId,
    req.params.boardId,
  );
  return res.json(deleteBoards);
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

// Application routes
router.use('/:boardId/ballots', ballotsRouter);
router.use('/:boardId/candidates', candidatesRouter);

module.exports = router;
