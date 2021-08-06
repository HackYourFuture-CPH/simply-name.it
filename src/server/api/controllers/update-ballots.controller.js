const knex = require('../../config/db');
const { InvalidIdError } = require('../lib/utils/http-error');

const editBallots = async (userId, boardId, candidates) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('userId and boardId should be integers');
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
