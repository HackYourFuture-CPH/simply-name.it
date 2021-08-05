const knex = require('../../config/db');

const HttpError = require('../lib/utils/http-error');

const deleteBoards = async (userId, boardId) => {
  if (!userId && !boardId) {
    throw new HttpError('Id should be a number', 400);
  }
  await knex('ballots').where({ boardId }).del();
  await knex('candidates').where({ boardId }).del();
  await knex('members').where({ boardId }).del();
  return knex('boards').where({ creatorId: userId, id: boardId }).del();
};

module.exports = {
  deleteBoards,
};
