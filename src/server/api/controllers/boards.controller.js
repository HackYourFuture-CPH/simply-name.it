const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const checkUserRole = async ({ userId, boardId }) => {
  const ifuserIsCreator = await knex('boards')
    .where('boards.creatorId', userId)
    .andWhere('boards.id', boardId);

  if (!ifuserIsCreator) {
    throw new IncorrectEntryError(`Only creator can take this action `);
  }
};

const deleteCandidate = async ({ candidateId, userId, boardId }) => {
  await checkUserRole({ userId, boardId });
  await knex('candidates')
    .where({ id: candidateId })
    .update({ isBlocked: true });
};

const deleteBoardsById = async (userId, boardId) => {
  if (!Number.isInteger(Number(boardId)) || !Number.isInteger(Number(userId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  return knex('boards').where({ creatorId: userId, id: boardId }).del();
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
  deleteCandidate,
};
