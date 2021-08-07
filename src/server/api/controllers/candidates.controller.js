const knex = require('../../config/db');
const { InvalidIdError } = require('../lib/utils/http-error');

const createCandidate = async (userId, boardId, newCandidate) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  const createNewCandidate = await knex('candidates').insert({
    boardId,
    name: newCandidate.name,
    isBlocked: false,
  });
  return createNewCandidate;
};

module.exports = {
  createCandidate,
};
