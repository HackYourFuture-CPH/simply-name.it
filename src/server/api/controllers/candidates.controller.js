const knex = require('../../config/db');
const {
  InvalidIdError,
  IncorrectEntryError,
} = require('../lib/utils/http-error');

const createCandidate = async (userId, boardId, newCandidate) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  if (Object.keys(newCandidate).length === 0) {
    throw new IncorrectEntryError(`New candidate is not created`);
  }
  if (typeof newCandidate.name !== 'string') {
    throw new IncorrectEntryError(`Candidate name should be string`);
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
