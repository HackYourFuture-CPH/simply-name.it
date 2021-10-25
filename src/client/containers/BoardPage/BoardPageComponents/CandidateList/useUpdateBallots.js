import { useEffect } from 'react';
import { fetchFromDb } from '../../../fetchMethod/fetch';

export async function useUpdateBallots(
  userId,
  boardId,
  candidates,
  draggedInit,
) {
  useEffect(() => {
    if (!draggedInit) return;
    (async () => {
      await fetchFromDb(
        `${userId}/boards/${boardId}/ballots`,
        'put',
        candidates,
      );
    })();
  }, [userId, boardId, candidates, draggedInit]);
}
