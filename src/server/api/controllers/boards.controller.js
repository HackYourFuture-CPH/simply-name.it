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
  createBoard,
};
