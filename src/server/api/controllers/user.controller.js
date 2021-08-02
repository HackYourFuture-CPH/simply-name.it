const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getUserById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const userById = await knex('users')
      .select(
        'users.id',
        'users.fullName',
        'users.email',
        'users.createdOn',
        'users.firebaseUId',
      )
      .where({ id });
    if (userById.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return userById;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getUserById,
};
