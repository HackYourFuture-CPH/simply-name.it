const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getBoardsByMemberId = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const boards = await knex('boards')
      .join('members', 'boards.id', '=', 'members.boardId')
      .select('*')
      .where('members.userId', id)
      .whereNot('members.role', 'owner');

    if (boards.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return boards;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getBoardsByMemberId,
};
