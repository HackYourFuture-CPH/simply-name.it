const knex = require('../../config/db');
const { client, usersIndex } = require('../../config/elastic');

const {
  IncorrectEntryError,
  InvalidRequestError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const { isInteger } = require('../lib/utils/validators');

const getUsers = async () => {
  const result = await client.search({
    index: usersIndex,
    body: {
      query: {
        match_all: {},
      },
      size: 50,
      sort: [
        {
          fullName: {
            order: 'asc',
          },
        },
      ],
    },
  });
  /* eslint no-underscore-dangle: ["error", { "allow": ["_source", "_id"] }] */
  return result.body.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));

  // return knex('users').select(
  //   'users.id',
  //   'users.fullName',
  //   'users.email',
  //   'users.createdOn',
  //   'users.firebaseUId',
  // );
  // KEEPING THIS SO THOSE NOT CONNECTED TO ELASTIC CAN USE getUsers IF NEEDED
};

const getUser = async (firebaseUId) => {
  const user = await knex('users').select('*').where({ firebaseUId });
  return user;
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

// SEARCH FOR A USER
const getUsersByKeyword = async (searchWord) => {
  if (!searchWord) {
    throw new IncorrectEntryError('Use a keyword!', 400);
  }

  const users = await client.search({
    index: usersIndex,
    body: {
      query: {
        multi_match: {
          query: searchWord,
          type: 'bool_prefix',
          fields: [
            'fullName.autocomplete',
            'fullName._2gram',
            'fullName._3gram',
          ],
        },
      },
      size: 30,
    },
  });

  /* eslint no-underscore-dangle: ["error", { "allow": ["_source", "_id"] }] */
  return users.body.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));

  //   const users = await knex('users').where(
  //     'fullName',
  //     'like',
  //     `%${searchWord}%`,
  //   );

  //   return users;
  // };
  // KEEPING THIS SO THOSE NOT CONNECTED TO ELASTIC CAN TEST DB SEARCH IF NEEDED
};

// CREATE USER
const createUser = async (newUser) => {
  console.log('controller', newUser);
  if (Object.keys(newUser).length === 0) {
    throw new InvalidRequestError(
      `key 'fullName, email, firebaseUId and value of type as 'string' is required`,
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
  const user = await getUser(newUser.firebaseUId);

  if (user.length) {
    return user;
  }

  const createdUserId = await knex('users').insert({
    fullName: newUser.fullName,
    email: newUser.email,
    firebaseUId: newUser.firebaseUId,
  });
  console.log('createdUserId in conroller', createdUserId);

  const newESuser = {
    fullName: newUser.fullName, // fullname
    email: newUser.email,
  };
  await client.index({
    id: createdUserId[0],
    index: usersIndex,
    body: newESuser,
  });

  return knex('users').where({ id: createdUserId });
};

const deleteUser = async (id) => {
  if (!Number.isInteger(Number(id))) {
    throw new InvalidIdError('Id should be an integer');
  }
  await knex('users').where({ id }).del();

  await client.delete({
    usersIndex,
    id,
  });
};

module.exports = {
  getUsers,
  getUserById,
  getUsersByKeyword,
  createUser,
  deleteUser,
};
