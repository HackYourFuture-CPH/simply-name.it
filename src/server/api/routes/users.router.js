const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const usersController = require('../controllers/users.controller');

const boardsRouter = require('./boards.router');

router.use('/:userId/boards', boardsRouter);

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *    - Users
 *    summary: Get all users
 *    description:
 *      Will return all users registered in the app.
 *    produces: application/json
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', async (req, res) => {
  const users = await usersController.getUsers();
  return res.json(users);
});

module.exports = router;
