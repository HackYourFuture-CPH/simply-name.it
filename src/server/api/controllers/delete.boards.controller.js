const knex = require('../../config/db');

const deleteBoards = async (boardsId) => {
  return knex('boards').where({ id: boardsId }).del();
};

module.exports = {
  deleteBoards,
};
