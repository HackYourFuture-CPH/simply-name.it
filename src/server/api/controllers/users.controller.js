const knex = require('../../config/db');
const { client, usersIndex } = require('../../config/elastic');

const index = 'dolphins';

const {
  IncorrectEntryError,
  InvalidRequestError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const { isInteger } = require('../lib/utils/validators');

// const createDBuser = async (document) => {
//   // Create user in DB
//   let newUserID;
//   if (Object.keys(document).length === 0) {
//     throw new InvalidRequestError(
//       `key 'fullName, email, firebaseUId and value of type 'string' is required`,
//     );
//   }
//   if (typeof document.fullname !== 'string') {
//     throw new IncorrectEntryError(`fullName should be string`);
//   }
//   if (typeof document.email !== 'string') {
//     throw new IncorrectEntryError(`email should be string`);
//   }

//   const createNewDBuser = await knex('users').insert(
//     // create user
//     {
//       fullName: document.fullname,
//       email: document.email,
//       firebaseUId: 'whatever',
//     },
//     'id',
//   );
//   // .then(function (result) {
//   //   newUserID = result;
//   // });

//   await createESuser(document, createNewDBuser);
// };

// const createESuser = async (document, id) => {
//   // Create user in ES
//   const newESuser = {
//     fullname: document.fullname, // fullname
//     email: document.email,
//   };
//   await client.index({
//     id,
//     index: index,
//     body: newESuser,
//   });
// };

// const deleteESuser = async (id) => {
//   await client.delete({
//     index,
//     id,
//   });
// }; MOVED

const getUsers = async () => {
  const result = await client.search({
    index: index,
    body: {
      query: {
        match_all: {},
      },
      size: 50,
      sort: ['name.keyword'],
    },
  });
  return result.body.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));
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

  // should I connect
  const users = await client.search({
    index: index,
    body: {
      query: {
        match: { fullname: searchWord },
      },
      size: 20,
    },
  });

  return users.body.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));
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
    fullname: newUser.fullName, // fullname
    email: newUser.email,
  };
  await client.index({
    id: createdUserId[0],
    index: index,
    body: newESuser,
  });

  return knex('users').where({ id: createdUserId });
};

const deleteUser = async (id) => {
  if (!Number.isInteger(Number(id))) {
    throw new InvalidIdError('Id should be an integer');
  }
  await knex('users').where({ id: id }).del();

  await client.delete({
    index,
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
