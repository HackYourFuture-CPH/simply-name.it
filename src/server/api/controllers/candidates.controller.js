const knex = require('../../config/db');

const getCandidates = async (userId, boardId) => {
  const candidates = await knex('candidates')
    .join('boards', 'candidates.boardId', '=', 'board.id')
    .join('users', 'candidates.userId', '=', 'user.id')
    .join('ballots', 'ballots.candidateId', '=', 'candidate.id')
    .select('candidates.name', 'candidates.rank')
    .where('candidates.boardId', boardId)
    .where('candidates.userId', userId)
    .where('ballots.candidateId', candidateId);

  return candidates;
};

module.exports = {
  getCandidates,
};
