const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getUserById = async (id) => {
  if (!Number(id)) {
    throw new HttpError('Id should be a number', 400);
  }

  const userById = await knex('users')
    .select('users.id', 'users.fullName', 'users.firebaseUId')
    .where({ id });

  if (userById.length === 0) {
    throw new HttpError(`incorrect entry with the id of ${id}`, 404);
  }
  return userById;
};

module.exports = {
  getUserById,
};
