const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const editBoard = async (boardId, updatedBoard) => {
  if (!boardId) {
    throw new HttpError('boardId should be a number', 400);
  }

  return knex('boards').where({ id: boardId }).update({
    title: updatedBoard.title,
    deadline: updatedBoard.deadline,
    banner: updatedBoard.banner,
  });
};

module.exports = {
  editBoard,
};
