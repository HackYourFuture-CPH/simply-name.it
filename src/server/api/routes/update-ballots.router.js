/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const ballotsController = require('../controllers/update-ballots.controller');

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/ballots:
 *  put:
 *    tags:
 *    - Ballots
 *    summary: Update a ballot
 *    description:
 *      Will update a ballot.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: userId of the ballot to put.
 *      - in: path
 *        name: boardId
 *        description: boardId of the ballot to put.
 *      - in: body
 *        name: ballot
 *        description: The ballot to update.
 *        schema:
 *          type: object
 *          properties:
 *            candidateId:
 *              type: integer
 *            rank:
 *              type: integer
 *    responses:
 *      201:
 *        description: Ballot is updated
 *      5XX:
 *        description: Unexpected error.
 */
router.put('/:userId/boards/:boardId/ballots', (req, res, next) => {
  ballotsController
    .editBallots(req.params.userId, req.params.boardId, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
