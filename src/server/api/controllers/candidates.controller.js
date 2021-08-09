const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const checkUserRole = async ({ userId, boardId }) => {
  const ifuserIsCreator = await knex('boards')
    .where('boards.creatorId', userId)
    .andWhere('boards.id', boardId);

  if (!ifuserIsCreator) {
    throw new IncorrectEntryError(`Only creator can take that action `);
  } else {
    deleteCandidate();
  }
  return ifuserIsCreator;
};

const deleteCandidate = async ({ candidateId, userId, boardId }) => {
  await checkUserRole({ candidateId, userId, boardId });
  await knex('candidates')
    .where({ id: candidateId })
    .update({ isBlocked: true });
};

module.exports = {
  deleteCandidate,
  checkUserRole,
};
