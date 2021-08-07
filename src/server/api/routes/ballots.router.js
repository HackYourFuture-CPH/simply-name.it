/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const ballotsController = require('../controllers/ballots.controller');

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
 *          type: array
 *          items:
 *            $ref: '#/definitions/Candidates'
 *          example:
 *           [
 *              { "candidateId":  1, "rank": 1},
 *              { "candidateId":  2, "rank": 2},
 *              { "candidateId":  3, "rank": 3}
 *           ]
 *    responses:
 *      204:
 *        description: Ballot is updated
 *      5XX:
 *        description: Unexpected error.
 *
 * definitions:
 *   Candidates:
 *     type: array
 *     items:
 *       $ref: '#/definitions/CandidatesModel'
 *
 *   CandidatesModel:
 *     type: object
 *     properties:
 *       candidateId:
 *         type: integer
 *         example: 1
 *       rank:
 *         type: integer
 *         example: 1
 */
router.put('/', async (req, res) => {
  const result = await ballotsController.editBallots(
    req.params.userId,
    req.params.boardId,
    req.body,
  );
  console.log(result);
  if (result.includes(1)) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = router;
