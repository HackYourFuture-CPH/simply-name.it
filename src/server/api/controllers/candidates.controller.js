const knex = require('../../config/db');

const getCandidates = async (userId, boardId) => {
  const candidates = await knex('candidates')
    .join('boards', 'candidates.boardId', '=', 'boards.id')
    .join('ballots', 'ballots.candidateId', '=', 'candidates.id')
    .select('candidates.name', 'ballots.rank')
    .where('candidates.boardId', boardId)
    .where('ballots.userId', userId)

  return candidates;
};

module.exports = {
  getCandidates,
};
