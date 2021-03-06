const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
  InvalidRequestError,
} = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const createBoard = async (userId, newBoard) => {
  if (!Number.isInteger(Number(userId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  if (Object.keys(newBoard).length === 0) {
    throw new InvalidRequestError(
      `key 'title, deadline' and value of type as 'string' is required`,
    );
  }
  if (typeof newBoard.title !== 'string') {
    throw new IncorrectEntryError(`Board title should be string`);
  }
  if (typeof newBoard.deadline !== 'string') {
    throw new IncorrectEntryError(`Date should be string`);
  }

  const createNewBoard = await knex('boards').insert({
    creatorId: userId,
    title: newBoard.title,
    deadline: moment(newBoard.deadline).format(),
    isDeleted: false,
    banner: newBoard.banner,
  });
  return createNewBoard;
};

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
    .select(
      'boards.id',
      'boards.title',
      'boards.createdOn',
      'boards.deadline',
      'boards.banner',
    )
    .where({
      creatorId: id,
      isDeleted: false,
    });
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
  return boards;
};

const getBoardById = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('The provided ids should be integer');
  }

  const boardInfoById = await knex('boards')
    .join('members', 'boards.id', '=', 'members.boardId')
    .select(
      'boards.id',
      'boards.creatorId',
      'boards.createdOn',
      'boards.title',
      'boards.deadline',
      'boards.isDeleted',
      'boards.banner',
    )
    .where('userId', userId)
    .andWhere('boardId', boardId);
  if (boardInfoById.length === 0) {
    throw new IncorrectEntryError(
      `userId: ${userId} or boardId: ${boardId} does not exist!`,
    );
  }
  return boardInfoById;
};

module.exports = {
  getBoardsByMemberId,
  deleteBoardsById,
  getBoardsByCreatorId,
  deleteCandidate,
  editBoard,
  createBoard,
  getBoardById,
};
