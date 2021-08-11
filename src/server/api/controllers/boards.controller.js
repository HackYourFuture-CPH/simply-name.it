const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const editBoard = async (userId, boardId, updatedBoard) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }

  const tableOwner = await knex('boards')
    .select('creatorId')
    .where({ id: boardId });

  if (Number(userId) !== tableOwner[0].creatorId) {
    throw new IncorrectEntryError(`Only board owner can update the board`);
  }

  await knex('boards').where({ id: boardId }).update({
    title: updatedBoard.title,
    deadline: updatedBoard.deadline,
    banner: updatedBoard.banner,
  });
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
  getBoardsByCreatorId,
  editBoard,
};
