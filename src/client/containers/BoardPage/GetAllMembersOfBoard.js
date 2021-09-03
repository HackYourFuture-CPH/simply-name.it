import { fetchFromDb } from '../fetchMethod/fetch';

export async function getAllMembersOfBoard(userId, boardId) {
  const result = await fetchFromDb(
    `/${userId}/boards/${boardId}/members`,
    'GET',
  );
  return result;
}
