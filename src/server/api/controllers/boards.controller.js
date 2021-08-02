const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const createBoard = async (userId, newBoard) => {
  console.log(userId);
  if (!userId) {
    throw new HttpError('userId should be a number', 400);
  }
  await knex('boards').insert({
    creatorId: userId,
    title: newBoard.title,
    deadline: moment(newBoard.deadline).format(),
    isDeleted: newBoard.isDeleted,
  });

  return {
    successful: true,
  };
};

module.exports = {
  createBoard,
};
