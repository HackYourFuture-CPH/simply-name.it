const { queries } = require('@testing-library/react');
const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const editBallots = async (userId, boardId, candidates) => {
  const trx = await knex.transaction();
  const queries = candidates.map((candidate) => {
    knex('ballots')
      .where({ userId, boardId, candidateId: candidate.candidateId })
      .update({ rank: candidate.rank })
      .transacting(trx);
  });
  return Promise.all(queries).then(trx.commit).catch(trx.rollback);
};
module.exports = {
  editBallots,
};
