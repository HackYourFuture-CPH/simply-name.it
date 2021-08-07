const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const getResultsByBoardId = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId, boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }

  const candidatesName = await knex('candidates')
    .join('results', 'candidates.id', '=', 'results.candidateId')
    .join('boards', 'boards.id', '=', 'results.boardId')
    .join('members', 'members.boardId', '=', 'boards.id')
    .where('results.boardId', boardId)
    .andWhere('members.userId', userId)
    .select('candidates.name');

  if (candidatesName.length === 0) {
    throw new IncorrectEntryError(
      `incorrect entry with the id of ${userId || boardId}`,
    );
  }

  return candidatesName;
};

module.exports = {
  getResultsByBoardId,
};
