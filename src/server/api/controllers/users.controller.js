const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const InvalidEntryError = require('../lib/utils/http-error');

const getUsersByKeyword = async (searchWord) => {
  if (!searchWord) {
    throw new HttpError('Use valid keyword!', 400);
  }

  try {
    const users = await knex('users').where(
      'fullname',
      'like',
      `%${searchWord}%`,
    );
    if (users.length === 0) {
      throw new InvalidEntryError(
        `Cannot find user with name like '${searchWord}'`,
        404,
      );
    }
    return users;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getUsersByKeyword,
};
