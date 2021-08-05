const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * /users/{ID}:
 *  get:
 *    tags:
 *    - User
 *    summary: Get specific user data  by ID
 *    description:
 *      Will return single user with a matching ID.
 *    produces: application/json
 *    parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the user to get
 *
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not found
 */
router.get('/:id', (req, res, next) => {
  userController
    .getUserById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
