const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
  UnauthorizedError,
} = require('../lib/utils/http-error');

const userIsMember = async (userId, boardId) => {
  const ifIsMember = await knex('members')
    .select('*')
    .where('members.boardId', boardId)
    .andWhere('members.userId', userId);
  console.log(ifIsMember);
  if (ifIsMember.length === 0) {
    throw new UnauthorizedError(`Only Members can take this action `);
  }
  return ifIsMember;
};
const getAllMembers = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  await userIsMember(userId, boardId);
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
