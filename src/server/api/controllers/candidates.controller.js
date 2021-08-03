const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const deleteCandidate = async (candidateId) => {
  return knex('candidates').where({ id: candidateId }).del();
};

module.exports = {
  deleteCandidate,
};
