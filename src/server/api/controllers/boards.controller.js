const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const deleteBoards = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) && !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  await knex('ballots').where({ boardId }).del();
  await knex('candidates').where({ boardId }).del();
  await knex('members').where({ boardId }).del();
  return knex('boards').where({ creatorId: userId, id: boardId }).del();
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
  deleteBoards,
};
