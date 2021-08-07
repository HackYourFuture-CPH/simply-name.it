const knex = require('../../config/db');
const {
  InvalidIdError,
  IncorrectEntryError,
} = require('../lib/utils/http-error');

const editBallots = async (userId, boardId, candidates) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('userId and boardId should be integers');
  } else if (candidates.length === 0) {
    throw new IncorrectEntryError(`candidates list is empty`);
  } else if (
    candidates.some(
      (candidate) =>
        !Number.isInteger(candidate.candidateId) ||
        !Number.isInteger(candidate.rank),
    )
  ) {
    throw new IncorrectEntryError(`candidateId and rank should be integers`);
  } else {
    return knex.transaction(function (trx) {
      const queries = candidates.map((candidate) => {
        return trx('ballots')
          .where({ userId, boardId, candidateId: candidate.candidateId })
          .update({ rank: candidate.rank });
      });
      return Promise.all(queries);
    });
  }
};
module.exports = {
  editBallots,
};
