/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getBoardByUserId = async (id) => {
  console.log(id);
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const boards = await knex('users')
      .join('boards', 'users.id', '=', 'boards.creatorId')
      .select('*')
      .where('creatorId', id);
    if (boards.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return boards;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getBoardByUserId,
};
