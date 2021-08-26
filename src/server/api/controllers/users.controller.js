const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidRequestError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const { isInteger } = require('../lib/utils/validators');

const getUsers = () => {
  return knex('users').select(
    'users.id',
    'users.fullName',
    'users.email',
    'users.createdOn',
    'users.firebaseUId',
  );
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
    'fullName',
    'like',
    `%${searchWord}%`,
  );

  return users;
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
  createUser,
};
