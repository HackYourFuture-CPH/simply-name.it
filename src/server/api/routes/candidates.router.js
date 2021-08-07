const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const candidatesController = require('../controllers/candidates.controller');

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
 */

router.post('/', async (req, res) => {
  const newCandidate = await candidatesController.createCandidate(
    req.params.userId,
    req.params.boardId,
    req.body,
  );
  return res.json(newCandidate);
});

module.exports = router;
