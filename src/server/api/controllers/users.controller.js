/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const isInteger = (id) => {
  if (Number.isInteger(Number(id))) {
    return true;
  }
  return false;
};

const getUsers = () => {
  return knex('users').select(
    'users.id',
    'users.fullname',
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

module.exports = {
  getUsers,
  getUserById,
};
