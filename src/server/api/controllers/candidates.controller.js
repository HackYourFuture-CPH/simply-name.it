const knex = require('../../config/db');

const {
  InvalidIdError,
  IncorrectEntryError,
  InvalidRequestError,
} = require('../lib/utils/http-error');

const checkUserRole = async ({ userId, boardId }) => {
  const ifuserIsCreator = await knex('boards')
    .where('boards.creatorId', userId)
    .andWhere('boards.id', boardId);

  if (!ifuserIsCreator) {
    throw new IncorrectEntryError(`Only creator can take this action `);
  }
};

const deleteCandidate = async ({ candidateId, userId, boardId }) => {
  await checkUserRole({ userId, boardId });
  await knex('candidates')
    .where({ id: candidateId })
    .update({ isBlocked: true });
};

const createCandidate = async (userId, boardId, newCandidate) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  if (Object.keys(newCandidate).length === 0) {
    throw new InvalidRequestError(
      `key 'name' and value of type 'string' is required`,
    );
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
  deleteCandidate,
  checkUserRole,
};
