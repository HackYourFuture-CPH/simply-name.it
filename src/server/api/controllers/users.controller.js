const knex = require('../../config/db');
const { IncorrectEntryError } = require('../lib/utils/http-error');

const getUsers = () => {
  return knex('users').select(
    'users.id',
    'users.fullname',
    'users.email',
    'users.createdOn',
    'users.firebaseUId',
  );
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
  getUsersByKeyword,
};
