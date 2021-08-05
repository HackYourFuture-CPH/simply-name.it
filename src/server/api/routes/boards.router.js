const express = require('express');

const router = express.Router({ mergeParams: true });

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

router.delete('/:userId/boards/:boardId', (req, res) => {
  boardsController
    .deleteBoards(req.params.userId, req.params.boardId)
    .then((result) => {
      // If result is equal to 0, then that means the module id does not exist
      if (result === 0) {
        res.status(404).send('The board ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
