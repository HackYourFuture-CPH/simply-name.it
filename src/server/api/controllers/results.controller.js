const knex = require('../../config/db');
const {
  IncorrectEntryError,
  InvalidIdError,
} = require('../lib/utils/http-error');
const moment = require('moment-timezone');
const date = moment().toDate();

const getResultsByBoardId = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('One of the provided id should be an integer');
  }

  const boardAuthorizationResult = await knex('members')
    .where('userId', userId)
    .andWhere('boardId', boardId)
    .count('* as count');
  if (boardAuthorizationResult[0].count === 0) {
    throw new IncorrectEntryError(
      `userId: ${userId} has no access to boardId: ${boardId}`,
    );
  }

  const candidatesName = await knex('candidates')
    .join('results', 'candidates.id', '=', 'results.candidateId')
    .where('results.boardId', boardId)
    .select('candidates.name', 'candidates.id', 'results.rank');

  if (candidatesName.length === 0) {
    throw new IncorrectEntryError(
      `userId: ${userId} or boardId: ${boardId} does not exist!`,
    );
  }

  return candidatesName;
};

const getResultsByDeadline = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('One of the provided id should be an integer');
  }

  const boardAuthorizationResult = await knex('members')
    .where('userId', userId)
    .andWhere('boardId', boardId)
    .count('* as count');
  if (boardAuthorizationResult[0].count === 0) {
    throw new IncorrectEntryError(
      `userId: ${userId} has no access to boardId: ${boardId}`,
    );
  }

  const deadline = await knex('boards')
    .join('members', 'boards.id', '=', 'members.boardId')
    .select('boards.deadline')
    .where('userId', userId)
    .andWhere('boardId', boardId);

  if (date > deadline) {
    throw new IncorrectEntryError(`The deadline has not been reached yet`);
  } else if (date <= deadline) {
    const doesExist = await knex('results')
      .join('boards', 'boards.id', '=', 'results.boardId')
      .where('results.boardId', boardId);
    if (doesExist) {
      const results = await knex('candidates')
        .join('results', 'candidates.id', '=', 'results.candidateId')
        .where('results.boardId', boardId)
        .select('candidates.name', 'candidates.id', 'results.rank');
      return results;
    } else {
      // Use a library to calculate the results and insert into the results table.
    }
  }
};

module.exports = {
  getResultsByBoardId,
  getResultsByDeadline,
};
