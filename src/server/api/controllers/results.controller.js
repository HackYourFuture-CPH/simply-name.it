const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getResultsByBoardId = async (userId, boardId) => {
  if (!userId && boardId) {
    throw new HttpError('Id should be a number', 400);
  }

  const candidatesName = await knex('candidates')
    .join('results', 'candidates.id', '=', 'results.candidateId')
    .join('boards', 'boards.id', '=', 'results.boardId')
    .join('members', 'members.boardId', '=', 'boards.id')
    .where('results.boardId', boardId)
    .andWhere('members.userId', userId)
    .select('candidates.name');

  if (candidatesName.length === 0) {
    throw new Error(`incorrect entry with the id of ${userId || boardId}`, 404);
  }

  return candidatesName;
};

module.exports = {
  getResultsByBoardId,
};
