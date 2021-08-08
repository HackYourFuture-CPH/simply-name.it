const knex = require('../../config/db');

const getCandidates = async (userId, boardId) => {
  const candidates = await knex('candidates')
    .join('boards', 'candidates.boardId', '=', 'boards.id')
    .join('users', 'users.userId', '=', 'user.id')
    .select('*')
    .where('candidates.boardId', boardId)
    .where('candidates.userId', userId);

  return candidates;
};

module.exports = {
  getCandidates,
};
