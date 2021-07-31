const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const deleteCandidateController = require('../controllers/delete.candidate.controller');

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
 *      200:
 *        description: Candidate deleted
 *      5XX:
 *        description: Unexpected error.
 */
router.delete('/api/candidates/:id', (req, res) => {
  deleteCandidateController
    .deleteCandidate(req.params.id, req)
    .then((result) => {
      // If result is equal to 0, then that means the candidate id does not exist
      if (result === 0) {
        res.status(404).send('The candidate ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
