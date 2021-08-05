const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const getBoardsByCreatorId = async (id) => {
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

const getBoardsByMemberId = async (id) => {
  if (!Number.isInteger(Number(id))) {
    throw new InvalidIdError('Id should be an integer');
  }

  const boards = await knex('boards')
    .join('members', 'boards.id', '=', 'members.boardId')
    .select('*')
    .where('members.userId', id)
    .whereNot('members.role', 'owner');

  if (boards.length === 0) {
    throw new IncorrectEntryError(`incorrect entry with the id of ${id}`);
  }

  return boards;
};

module.exports = {
  getBoardsByMemberId,
  getBoardsByCreatorId,
};
