const knex = require('../../config/db');
const { InvalidIdError } = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const createBoard = async (userId, newBoard) => {
  if (!Number.isInteger(Number(userId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  const createNewBoard = await knex('boards').insert({
    creatorId: userId,
    title: newBoard.title,
    deadline: moment(newBoard.deadline).format(),
    isDeleted: newBoard.isDeleted,
    banner: newBoard.banner,
  });

  return createNewBoard;
};

module.exports = {
  createBoard,
};
