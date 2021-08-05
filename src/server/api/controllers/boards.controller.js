const knex = require('../../config/db');
const { InvalidIdError } = require('../lib/utils/http-error');

const deleteBoards = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) && !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  await knex('ballots').where({ boardId }).del();
  await knex('candidates').where({ boardId }).del();
  await knex('members').where({ boardId }).del();
  return knex('boards').where({ creatorId: userId, id: boardId }).del();
};

module.exports = {
  deleteBoards,
};
