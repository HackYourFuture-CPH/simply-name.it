const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const getAllMembers = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) && !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }

  const members = await knex('members')
    .join('users', 'members.userId', '=', 'users.id')
    .select('*')
    .where('members.boardId', boardId);
  console.log(members);
  if (members.length === 0) {
    throw new IncorrectEntryError(`incorrect entry with the id of ${boardId}`);
  }
  return members;
};

module.exports = {
  getAllMembers,
};
