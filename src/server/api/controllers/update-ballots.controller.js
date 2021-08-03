const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const editBallots = async (userId, boardId, candidates) => {
  if (!userId && !boardId) {
    throw new HttpError('userId and boardId should be a number', 400);
  }
  knex.transaction(function (trx) {
    const queries = candidates.map((candidate) => {
      return knex('ballots')
        .where({ userId, boardId, candidateId: candidate.candidateId })
        .update({ rank: candidate.rank })
        .transacting(trx);
    });
    return Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });
};
module.exports = {
  editBallots,
};
