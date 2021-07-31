const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const deleteBoardsController = require('../controllers/delete.boards.controller');

/**
 * @swagger
 * /boards/{ID}:
 *  delete:
 *    tags:
 *    - boards
 *    summary: Delete a board
 *    description:
 *      Will delete a board with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the board to delete.
 *    responses:
 *      200:
 *        description: Board deleted
 *      5XX:
 *        description: Unexpected error.
 */
router.delete('/:id', (req, res) => {
  deleteBoardsController
    .deleteBoards(req.params.id, req)
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
