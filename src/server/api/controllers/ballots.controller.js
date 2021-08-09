const knex = require('../../config/db');
const {
  InvalidIdError,
  IncorrectEntryError,
  InvalidRequestError,
} = require('../lib/utils/http-error');

const { isInteger } = require('../lib/utils/validators');

const editBallots = async (userId, boardId, candidates) => {
  if (!isInteger(userId) || !isInteger(boardId)) {
    throw new InvalidIdError('UserId and boardId should be integers');
  }

  if (candidates.length === 0) {
    throw new InvalidRequestError(`Candidates array is empty`);
  }

  if (
    candidates.some(
      (candidate) =>
        !isInteger(candidate.candidateId) || !isInteger(candidate.rank),
    )
  ) {
    throw new InvalidIdError(`CandidateId and rank should be integers`);
  }

  return knex.transaction(function (trx) {
    const queries = candidates.map((candidate) => {
      return trx('ballots')
        .where({ userId, boardId, candidateId: candidate.candidateId })
        .update({ rank: candidate.rank });
    });
    return Promise.all(queries).then((results) => {
      if (results.includes(0)) {
        throw new IncorrectEntryError(
          `Request aborted. Ids matching Board, User or candidate could could not be updated`,
        );
      }
      return results;
    });
  });
};
module.exports = {
  editBallots,
};
