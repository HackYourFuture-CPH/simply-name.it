const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const createBoard = async (userId, newBoard) => {
  if (!Number.isInteger(Number(userId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  if (newBoard.length === 0) {
    throw new IncorrectEntryError(`Board is not created`);
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
  createBoard,
};
