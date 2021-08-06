/* TODO: This is just an example file to illustrate API routing and
documentation. Can be deleted when the first real route is added. */

const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const usersController = require('../controllers/users.controller');

const boardsRouter = require('./boards.router');
router.use('/:userId/boards', boardsRouter);

/**
 * @swagger
 * /users/search?fullName=keyword:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get users by search word
 *    description:
 *      Will return users whos full name match the search word.
 *    produces: application/json
 *    parameters:
 *     - in: query
 *       name: fullName
 *       schema:
 *         type: string
 *         required: true
 *         description: search word to match against the user's full name
 *
 *    responses:
 *
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error
 * 404:
 *        description: Not found
 * 400:
 *        description: Bad request
 *
 *
 */
router.get('/search', async (req, res) => {
  const searchedUsers = await usersController.getUsersByKeyword(
    req.query.fullName,
  );

  return res.json(searchedUsers);
});

module.exports = router;
