const knex = require('../../config/db');

const deleteCandidate = async (candidateId) => {
  return knex('candidates').where({ id: candidateId }).del();
};

module.exports = {
  deleteCandidate,
};
