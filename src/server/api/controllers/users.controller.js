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
    res.status(200).send(`Cannot find user with name like '${searchWord}'`);
  }
  return users;
};

module.exports = {
  getUsersByKeyword,
};
