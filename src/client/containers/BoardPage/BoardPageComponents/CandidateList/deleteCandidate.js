import { fetchFromDb } from '../../../fetchMethod/fetch';

export async function deleteCandidate(userId, boardId, candidateId) {
  const response = await fetchFromDb(
    `${userId}/boards/${boardId}/candidates/${candidateId}`,
    'delete',
  );

  return response;
}
