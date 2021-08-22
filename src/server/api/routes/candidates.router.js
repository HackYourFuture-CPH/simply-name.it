const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const candidatesController = require('../controllers/candidates.controller');

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/candidates/{candidateId}:
 *  delete:
 *    tags:
 *    - Candidates
 *    summary: Delete a candidate
 *    description:
 *      Will delete a candidate with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: candidateId
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the candidate to delete.
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the user who create the candidates.
 *      - in: path
 *        name: boardId
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the board which contain the candidate.
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      404:
 *        description: Candidate Not Found
 *      5XX:
 *        description: Unexpected error.
 */

router.delete('/:candidateId', async (req, res) => {
  await candidatesController.deleteCandidate(req.params);
  return res.status(204).send();
});

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/candidates:
 *  post:
 *    tags:
 *    - Candidates
 *    summary: Create a candidate
 *    description:
 *      Will create a new candidate for a specific board.
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
 *     - in: body
 *       name: candidate
 *       description: The candidate to add.
 *       schema:
 *         type: object
 *         required:
 *           - name
 *         properties:
 *           name:
 *             type: string
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

router.post('/', async (req, res) => {
  await candidatesController.createCandidate(
    req.params.userId,
    req.params.boardId,
    req.body,
  );
  return res.status(201).send();
});

/**
 * @swagger
 * /users/{userId}/boards/{boardId}/candidates:
 *  get:
 *    tags:
 *    - Candidates
 *    summary: Get all candidates of a specific board
 *    description:
 *      Get all candidates of a specific board
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: userId
 *       schema:
 *         type: integer
 *         required: true
 *         description: ID of the specified user
 *     - in: path
 *       name: boardId
 *       schema:
 *         type: integer
 *         required: true
 *         description: ID of the specified board
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error
 *      400:
 *          Invalid ID
 *      404:
 *        description: Invalid entry error
 */

router.get('/', async (req, res) => {
  const boardCandidates = await candidatesController.getCandidates(
    req.params.userId,
    req.params.boardId,
  );
  return res.json(boardCandidates);
});

module.exports = router;
