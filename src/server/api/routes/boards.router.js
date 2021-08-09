const express = require('express');

const router = express.Router({ mergeParams: true });
const ballotsRouter = require('./ballots.router');

// controllers
const boardsController = require('../controllers/boards.controller');

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

/* router.delete('/:boardId', (req, res) => {
  boardsController
    .deleteBoards(req.params.userId, req.params.boardId)
    .then((result) => {
      // If result is equal to 0, then that means the module id does not exist
      if (result === 0) {
        res.status(404).send('The board ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    });
}); */

router.delete('/:boardId', async (req, res) => {
  const deleteBoards = await boardsController.deleteBoardsById(
    req.params.boardId,
  );
  res.json(deleteBoards);
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
router.use('/:boardId/ballots', ballotsRouter);

router.get('/created', async (req, res) => {
  const boardsByCreatorId = await boardsController.getBoardsByCreatorId(
    req.params.userId,
  );

  return res.json(boardsByCreatorId);
});

module.exports = router;
