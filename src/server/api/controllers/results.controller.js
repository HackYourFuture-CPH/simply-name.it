const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const getResultsByBoardId = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId, boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }

  const boardAuthorizationResult = await knex('members')
    .where('userId', userId)
    .andWhere('boardId', boardId)
    .count('* as count');
  if (boardAuthorizationResult[0].count === 0) {
    throw new IncorrectEntryError(
      `userId: ${userId} has no access to boardId: ${boardId}`,
    );
  }

  const candidatesName = await knex('candidates')
    .join('results', 'candidates.id', '=', 'results.candidateId')
    .where('results.boardId', boardId)
    .select('candidates.name', 'candidates.id', 'results.rank');

  if (candidatesName.length === 0) {
    throw new IncorrectEntryError(
      `userId: ${userId} or boardId: ${boardId} does not exist!`,
    );
  }

  return candidatesName;
};

module.exports = {
  getResultsByBoardId,
};
