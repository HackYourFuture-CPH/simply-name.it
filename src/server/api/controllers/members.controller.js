const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

// const getModules = async () => {
//   return knex('modules').select('modules.id', 'modules.title');
// };

const getAllMembers = async (userId, boardId) => {
  if (!userId && !boardId) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const members = await knex('members')
      .join('users', 'members.userId', '=', 'users.id')
      .select('*')
      .where('members.boardId', boardId);
    console.log(members);
    if (members.length === 0) {
      throw new Error(`incorrect entry with the id of ${boardId}`, 404);
    }
    return members;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllMembers,
};
