const express = require('express');

const router = express.Router({ mergeParams: true });

// Router imports
const ballotsRouter = require('./ballots.router');
const candidatesRouter = require('./candidates.router');
const resultsRouter = require('./results.router');

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
 *        name: userId
 *        required: true
 *        description: Id of the board owner
 *
 *      - in: path
 *        name: boardId
 *        required: true
 *        description: Id of the board to update
 *
 *      - in: body
 *        name: board
 *        description: The board to create.
 *
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
 *      204:
 *        description: Board updated
 *      400:
 *        description: Invalid Id
 *      5XX:
 *        description: Unexpected error.
 */
router.put('/:boardId', async (req, res) => {
  await boardsController.editBoard(
    req.params.userId,
    req.params.boardId,
    req.body,
  );
  return res.status(204).send();
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

router.get('/created', async (req, res) => {
  const boardsByCreatorId = await boardsController.getBoardsByCreatorId(
    req.params.userId,
  );
  return res.json(boardsByCreatorId);
});

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
 *          properties:
 *            title:
 *              type: string
 *            deadline:
 *              type: string
 *              format: date-time
 *            banner:
 *              type: binary
 *    responses:
 *      201:
 *        description: Board created
 *      5XX:
 *        description: Unexpected error.
 *      400:
 *        description: Invalid Id error.
 *      404:
 *        description: Incorrect entry error.
 */

router.post('/', async (req, res) => {
  await boardsController.createBoard(req.params.userId, req.body);
  return res.status(201).send();
});

// Application routes
router.use('/:boardId/ballots', ballotsRouter);
router.use('/:boardId/candidates', candidatesRouter);
router.use('/:boardId/results', resultsRouter);

module.exports = router;
