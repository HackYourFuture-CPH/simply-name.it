const knex = require('../../config/db');
const getMembers = require('./members.controller.js');

const {
  InvalidIdError,
  IncorrectEntryError,
  InvalidRequestError,
} = require('../lib/utils/http-error');

const checkUserRole = async ({ userId, boardId }) => {
  const ifuserIsCreator = await knex('boards')
    .where('boards.creatorId', userId)
    .andWhere('boards.id', boardId);

  if (!ifuserIsCreator) {
    throw new IncorrectEntryError(`Only creator can take this action `);
  }
};

const deleteCandidate = async ({ candidateId, userId, boardId }) => {
  await checkUserRole({ userId, boardId });
  await knex('candidates')
    .where({ id: candidateId })
    .update({ isBlocked: true });
};

const createCandidate = async (userId, boardId, newCandidate) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  if (Object.keys(newCandidate).length === 0) {
    throw new InvalidRequestError(
      `key 'name' and value of type 'string' is required`,
    );
  }
  if (typeof newCandidate.name !== 'string') {
    throw new IncorrectEntryError(`Candidate name should be string`);
  }
  await checkUserRole({ userId, boardId });
  const createNewCandidate = await knex('candidates').returning('id').insert({
    boardId,
    name: newCandidate.name,
    isBlocked: false,
  });
  const getAllMembersOfBoard = await getMembers.getAllMembers(userId, boardId);
  const allMembersId = getAllMembersOfBoard.map((member) => member.userId);
  await Promise.all(
    allMembersId.map((id) => {
      return knex('ballots').insert({
        boardId,
        userId: id,
        candidateId: createNewCandidate[0],
        rank: -1,
      });
    }),
  );
  return createNewCandidate;
};

const getCandidates = async (userId, boardId) => {
  if (!Number.isInteger(Number(userId)) || !Number.isInteger(Number(boardId))) {
    throw new InvalidIdError('Id should be an integer');
  }
  const candidates = await knex('candidates')
    .join('ballots', 'ballots.candidateId', '=', 'candidates.id')
    .select('candidates.name', 'ballots.rank', 'candidateId')
    .where('candidates.boardId', boardId)
    .where('ballots.userId', userId)
    .where('candidates.isBlocked', 0)
    .orderBy('rank', 'asc');

  if (candidates.length === 0) {
    throw new IncorrectEntryError(
      `Incorrect userId: ${userId} or boardId: ${boardId}`,
    );
  }
  return candidates;
};

module.exports = {
  createCandidate,
  deleteCandidate,
  checkUserRole,
  getCandidates,
};
