const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const deleteBoardsById = async (boardId) => {
  if (Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  const deleteBoards = await knex('boards').where({ id: boardId }).del();
  return deleteBoards;

  // await knex('ballots').where({ boardId }).del();
  // await knex('candidates').where({ boardId }).del();
  // await knex('members').where({ boardId }).del();
  // return knex('boards').where({ creatorId: userId, id: boardId }).del();
};

const getBoardsByCreatorId = async (id) => {
  if (!Number.isInteger(Number(id))) {
    throw new InvalidIdError('Id should be an integer!');
  }

  const boards = await knex('users')
    .join('boards', 'users.id', '=', 'boards.creatorId')
    .select('*')
    .where('creatorId', id);
  if (boards.length === 0) {
    throw new IncorrectEntryError(`incorrect entry with the id of ${id}`);
  }
  return boards;
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
  deleteBoardsById,
  getBoardsByCreatorId,
};
