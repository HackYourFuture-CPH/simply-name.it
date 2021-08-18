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

const createUser = async (document) => {
  // Create user in DB

  if (Object.keys(newUser).length === 0) {
    throw new InvalidRequestError(
      `key 'fullName, email, firebaseUId and value of type 'string' is required`,
    );
  }
  if (typeof newUser.fullName !== 'string') {
    throw new IncorrectEntryError(`fullName should be string`);
  }
  if (typeof newUser.email !== 'string') {
    throw new IncorrectEntryError(`email should be string`);
  }
  if (typeof newUser.firebaseUId !== 'string') {
    throw new IncorrectEntryError(`firebaseUId should be string`);
  }
  const createNewUser = await knex('users').insert({
    fullName: newUser.fullName || 'ANONYMOUS',
    email: newUser.email,
    firebaseUId: newUser.firebaseUId || 'anonymous',
  });

  // Create user in ES

  await client.index({
    // id: dbResult.id, // TODO: set this to the ID from the DB
    index: index,
    body: document,
  });
};

const moveUSersfromDBtoES = async () => {
  const DBusers = await knex('users').select(
    'users.id',
    'users.fullname',
    'users.email',
    'users.createdOn',
    'users.firebaseUId',
  );

  DBusers.map((user) => {
    const DBuserDocument = {
      name: user.fullname,
      email: user.email,
    };
    createUser(DBuserDocument);
  });
};

//moveUSersfromDBtoES();

const getUsers = async () => {
  const result = await client.search({
    index: index,
    body: {
      query: {
        match_all: {},
      },
      size: 50,
    },
  });

  return result.body.hits.hits.map((hit) => hit._source);

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

  // const users = await knex('users').where(
  //   'fullname',
  //   'like',
  //   `%${searchWord}%`,
  // );
  const users = await client.search({
    index: index,
    body: {
      query: {
        match: { name: searchWord },
      },
      size: 20,
    },
  });

  return users.body.hits.hits.map((hit) => hit._source);
};

module.exports = {
  getUsers,
  getUserById,
  getUsersByKeyword,
};
