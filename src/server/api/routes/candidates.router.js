const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const candidatesController = require('../controllers/candidates.controller');

/**
 * @swagger
 * /candidates/{ID}:
 *  delete:
 *    tags:
 *    - Candidates
 *    summary: Delete a candidate
 *    description:
 *      Will delete a candidate with a given ID.
 *    produces: application/json
 *    parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the candidate to delete.
 *    responses:
 *      404:
 *        description: Candidate Not Found
 *      5XX:
 *        description: Unexpected error.
 */
router.delete(
  '/users/:userId/boards/:boardId/:candidateId',
  (req, res, next) => {
    candidatesController
      .deleteCandidate(req.params.candidateId, req)
      .then((result) => {
        // If result is equal to 0, then that means the candidate id does not exist
        if (result === 0) {
          res
            .status(404)
            .json({ message: 'The candidate ID you provided does not exist.' });
        } else {
          res.status(204);
        }
      })
      .catch(next);
  },
);

module.exports = router;
