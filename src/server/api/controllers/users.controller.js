const knex = require('../../config/db');

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
const index = 'dolphins';

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const { isInteger } = require('../lib/utils/validators');

const createIndex = () => {};

const createStudent = (document) => {
  // TODO: Create student in DB
  // const dbResult = await knex('students').insert(document, 'id')

  // Create student in ES

  client.index({
    // id: dbResult.id, // TODO: set this to the ID from the DB
    index: index,
    body: document,
  });
};

const getUsers = async () => {
  let i = Math.floor(Math.random() * 99);
  const studentDocument = { name: `hehe${i}` };
  createStudent(studentDocument);

  const result = await client.search({
    index: index,
    body: {
      query: {
        match_all: {},
      },
      size: 20,
    },
  });

  return result.body.hits.hits.map((hit) => ({ name: hit._source.name }));

  // return res.json(
  //   result.body.hits.hits.map((hit) => ({ name: hit._source.name })),
  // );
  // return knex('users').select(
  //   'users.id',
  //   'users.fullname',
  //   'users.email',
  //   'users.createdOn',
  //   'users.firebaseUId',
  // );
};

const getUserById = async (id) => {
  if (!isInteger(id)) {
    throw new InvalidIdError('Id should be an integer');
  }

  const userById = await knex('users')
    .select('users.id', 'users.fullName', 'users.firebaseUId')
    .where({ id });

  if (userById.length === 0) {
    throw new IncorrectEntryError(`incorrect entry with the id of ${id}`);
  }
  return userById;
};

const getUsersByKeyword = async (searchWord) => {
  if (!searchWord) {
    throw new IncorrectEntryError('Use a keyword!', 400);
  }

  const users = await knex('users').where(
    'fullname',
    'like',
    `%${searchWord}%`,
  );

  return users;
};

module.exports = {
  getUsers,
  getUserById,
  getUsersByKeyword,
};
