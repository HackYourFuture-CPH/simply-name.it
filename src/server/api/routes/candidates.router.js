const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const candidatesController = require('../controllers/candidates.controller');

//

/**
 * @swagger
 * /Candidates/users/{userId}/boards/{boardId}/candidates/{candidateId}:
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
 *        description: ID of the candidate to delete.
 *      - in: path
 *        name: userId
 *        description: ID of the user who create the candidates.
 *      - in: path
 *        name: boardId
 *        description: ID of the board which contain the candidate.
 *    responses:
 *      404:
 *        description: Candidate Not Found
 *      5XX:
 *        description: Unexpected error.
 */

router.delete(
  '/users/:userId/boards/:boardId/candidates/:candidateId',
  (req, res) => {
    candidatesController
      .getCandidate(req.params)
      .then((result) => {
        // If result is equal to 0, then that means the candidate id does not exist
        if (result.length === 0) {
          res
            .status(404)
            .json({ message: 'The candidate ID you provided does not exist.' });
        } else {
          candidatesController.deleteCandidate(req.params).then(() => {
            res.status(204).end();
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
);

module.exports = router;
