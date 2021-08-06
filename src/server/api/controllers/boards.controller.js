const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

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
const getAllMembers = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  const members = await knex('members')
    .join('users', 'members.userId', '=', 'users.id')
    .select('*')
    .where('members.boardId', boardId);
  if (members.length === 0) {
    throw new IncorrectEntryError(`incorrect entry with the id of ${boardId}`);
  }
  return members;
};

module.exports = {
  getBoardsByMemberId,
  getAllMembers,
};
