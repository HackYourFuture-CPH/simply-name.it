const knex = require('../../config/db');
const { IncorrectEntryError } = require('../lib/utils/http-error');

const getUsersByKeyword = async (searchWord) => {
  if (!searchWord) {
    throw new IncorrectEntryError('Use a keyword!', 400);
  }

  const users = await knex('users').where(
    'fullname',
    'like',
    `%${searchWord}%`,
  );
  if (users.length === 0) {
    throw new IncorrectEntryError(
      `Cannot find user with name like '${searchWord}'`,
      404,
    );
  }
  return users;
};

module.exports = {
  getUsersByKeyword,
};
