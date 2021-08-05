const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const membersController = require('../controllers/members.controller');

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/members:
 *  get:
 *    tags:
 *    - Members
 *    summary: Get all members of a specific board
 *    description:
 *      Get all members of a specific board.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The userId of the specific user to get
 *     - in: path
 *       name: boardId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The boardId of the specific board to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 *      404:
 *         Not Found
 *      400:
 *          Bad Request
 */
router.get('/:userId/boards/:boardId/members', (req, res, next) => {
  membersController
    .getAllMembers(req.params.userId, req.params.boardId)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
