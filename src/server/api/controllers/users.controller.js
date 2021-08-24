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
  InvalidRequestError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const { isInteger } = require('../lib/utils/validators');

const createIndex = () => {
  //does the index exist? move
  //if not, create and move
};

const createDBuser = async (document) => {
  // Create user in DB
  let newUserID;
  if (Object.keys(document).length === 0) {
    throw new InvalidRequestError(
      `key 'fullName, email, firebaseUId and value of type 'string' is required`,
    );
  }
  if (typeof document.fullname !== 'string') {
    throw new IncorrectEntryError(`fullName should be string`);
  }
  if (typeof document.email !== 'string') {
    throw new IncorrectEntryError(`email should be string`);
  }

  const createNewDBuser = await knex('users').insert(
    // create user
    {
      fullName: document.fullname,
      email: document.email,
      firebaseUId: 'whatever',
    },
    'id',
  );
  // .then(function (result) {
  //   newUserID = result;
  // });

  await createESuser(document, createNewDBuser);
};

const createESuser = async (document, id) => {
  // Create user in ES
  const newESuser = {
    name: document.fullname, // fullname
    email: document.email,
  };
  await client.index({
    id,
    index: index,
    body: newESuser,
  });
};

const deleteESuser = async (id) => {
  await client.delete({
    index,
    id,
  });
};

const deleteDBuser = async (id) => {
  if (!Number.isInteger(Number(id))) {
    throw new InvalidIdError('Id should be an integer');
  }
  await knex('users').where({ id: id }).del();
  await deleteESuser(id);
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
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    };
    createESuser(DBuserDocument, user.id);
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
      sort: ['name.keyword'],
    },
  });
  return result.body.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));
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

  // should I connect
  const users = await client.search({
    index: index,
    body: {
      query: {
        match: { name: searchWord },
      },
      size: 20,
    },
  });

  return users.body.hits.hits.map((hit) => ({ ...hit._source, id: hit._id }));
};

const getUser = async (firebaseUId) => {
  const user = await knex('users').select('*').where({ firebaseUId });
  return user;
};

const createUser = async (newUser) => {
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
  return knex('users').where({ id: createdUserId });
};

module.exports = {
  getUsers,
  getUserById,
  getUsersByKeyword,
  createDBuser,
  createESuser,
  deleteDBuser,
};
