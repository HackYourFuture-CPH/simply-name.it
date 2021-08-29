const express = require('express');
const { authenticate } = require('../../middleware/auth');

const router = express.Router({ mergeParams: true });

// Controllers
const usersController = require('../controllers/users.controller');
// Router imports
const boardsRouter = require('./boards.router');

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
 *      404:
 *        description: Not found
 *      400:
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

/**
 * @swagger
 * /users/{ID}:
 *  get:
 *    tags:
 *    - Users
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
router.get('/:id', async (req, res) => {
  const userById = await usersController.getUserById(req.params.id);
  return res.json(userById);
});

// Application routes
router.use('/:userId/boards', boardsRouter);

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *    - Users
 *    summary: Create a user
 *    description:
 *      Will create a new user.
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - fullName
 *            - email
 *            - firebaseUId
 *          properties:
 *            fullName:
 *              type: string
 *            email:
 *              type: string
 *            firebaseUId:
 *              type: string
 *    responses:
 *      201:
 *        description: User created
 *      5XX:
 *        description: Unexpected error.
 *      400:
 *        description: Bad request.
 *      404:
 *        description: Not found.
 */
router.post('/', [authenticate], async (req, res) => {
  const user = await usersController.createUser(req.body);
  return res.json(user);
});

module.exports = router;
