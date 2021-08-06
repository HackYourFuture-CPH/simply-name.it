const knex = require('../../config/db');

const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const getCandidate = ({ candidateId, userId, boardId }) => {
  return knex('candidates')
    .join('boards', 'boards.Id', '=', 'candidates.boardId')
    .where({ boardId, creatorId: userId, 'candidates.id': candidateId });
};

const deleteCandidate = async ({ candidateId }) => {
  return knex('candidates').where({ id: candidateId }).del();
};

module.exports = {
  deleteCandidate,
  getCandidate,
};
