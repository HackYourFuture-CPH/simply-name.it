const knex = require('../../../config/db');

const calculateResultsDeadline = async () => {
  const boards = await knex('boards')
    .whereNotExists(
      knex.select('*').from('results').whereRaw('boards.id = results.boardId'),
    )
    .select('boards.id', 'boards.deadline')
    .debug();
  console.log(boards);
  return boards;
};
module.exports = {
  calculateResultsDeadline,
};
