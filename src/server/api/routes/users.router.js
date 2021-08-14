const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  cloud: {
    id:
      'dolphin-project:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDY2NDU1MWJhNzM0NjQzNTVhMmE5MGZkMTVkZTYxYTM3JDZiNDQ2MjA2YjgyNjRmOTliZTJhNzZiZTcwMjk4Zjdl',
  },
  auth: {
    apiKey: 'WkJ4ZlJuc0IwSmlZa0xsa1QxeW86R3BfWXl3SEhTX2lrZ29URnk4M1J5Zw==',
  },
});
const express = require('express');

const router = express.Router({ mergeParams: true });

// Controllers
const usersController = require('../controllers/users.controller');

const index = 'dolphins';

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
  let query;

  if ('fullName' in req.query) {
    query = {
      match: { name: req.query.fullName || '' },
    };
  } else {
    console.log(woops);
    query = {
      match_all: {},
    };
  }

  const result = await client.search({
    index: index,
    body: {
      query: query,
      size: 20,
    },
  });

  return res.json(
    result.body.hits.hits.map((hit) => ({ name: hit._source.name })),
  );

  // const users = await usersController.getUsers();
  // return res.json(users);
});

const createUser = async (document) => {
  // TODO: Create student in DB
  // const dbResult = await knex('students').insert(document, 'id')

  // Create student in ES
  const esResult = await client.index({
    // id: dbResult.id, // TODO: set this to the ID from the DB
    index: index,
    body: document,
  });

  console.log('esResult', esResult);
};

router.post('/', async (req, res) => {
  const userDoc = { name: req.body.name };
  await createUser(userDoc);

  res.json({ created: true });
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

  if (searchedUsers.length === 0) {
    res
      .status(200)
      .send(`Cannot find user with name like '${req.query.fullName}'`);
  }

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

module.exports = router;

/// -----------

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
router.use(express.json());

// app.put('/students/:id', async (req, res) => {
//   const studentDocument = { name: req.body.name };

//   // TODO: Update student in DB

//   // Update student in ES
//   const esResult = await client.index({
//     id: req.params.id,
//     index: index,
//     body: studentDocument,
//   });

//   console.log('esResult', esResult);

//   res.json({ updated: true });
// });
