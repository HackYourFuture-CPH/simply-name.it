const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');

const getAllMembers = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  const allMembers = await knex('members')
    .join('users', 'members.userId', '=', 'users.id')
    .select(
      'members.userId',
      'members.role',
      'users.fullName',
      'users.firebaseUId',
    )
    .where('members.boardId', boardId);
  if (allMembers.length === 0) {
    throw new IncorrectEntryError(`This board has no Members`);
  }
  return allMembers;
};

module.exports = {
  getAllMembers,
};
