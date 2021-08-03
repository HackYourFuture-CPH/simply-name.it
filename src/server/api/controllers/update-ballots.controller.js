const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const editBallots = async (userId, boardId, candidates) => {
  if (!userId && !boardId) {
    throw new HttpError('moduleId should be a number', 400);
  }
  const trx = await knex.transaction();
  const queries = candidates.map((candidate) => {
    return knex('ballots')
      .where({ userId, boardId, candidateId: candidate.candidateId })
      .update({ rank: candidate.rank })
      .transacting(trx);
  });
  return Promise.all(queries).then(trx.commit).catch(trx.rollback);
};
module.exports = {
  editBallots,
};
