const express = require('express');

const router = express.Router({ mergeParams: true });

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

router.get('/', async (req, res) => {
  const membersOfBoard = await membersController.getAllMembers(
    req.params.userId,
    req.params.boardId,
  );
  return res.json(membersOfBoard);
});

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/members/{memberId}:
 *  post:
 *    tags:
 *    - Members
 *    summary: add a member to a board
 *    description:
 *      Will add a new member to a specific board.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The userId of the owner of the board
 *     - in: path
 *       name: boardId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The boardId of the specific board to get
 *     - in: path
 *       name: memberId
 *       schema:
 *         type: integer
 *         required: true
 *         description: The memberId of the user to add to the board as member
 *
 *    responses:
 *      201:
 *        description: Candidate added
 *      5XX:
 *        description: Unexpected error
 *      400:
 *          Invalid Id error
 *      404:
 *        description: Invalid entry error
 */

router.post('/:memberId', async (req, res) => {
  await membersController.addMember(
    req.params.userId,
    req.params.boardId,
    req.params.memberId,
  );
});

module.exports = router;
