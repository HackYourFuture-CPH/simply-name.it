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
router.get('/', (req, res, next) => {
  boardsController
    .getBoardsByMemberId(req.params.userId)
    .then((result) => {
      return res.json(result);
    })
    .catch(next);
});

module.exports = router;
