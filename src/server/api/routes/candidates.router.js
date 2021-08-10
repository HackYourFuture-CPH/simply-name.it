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

module.exports = router;
