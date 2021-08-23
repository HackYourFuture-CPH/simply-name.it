import { useEffect } from 'react';

export async function useUpdateBallots(
  userId,
  boardId,
  candidates,
  draggedInit,
) {
  useEffect(() => {
    if (!draggedInit) return;
    (async () => {
      await fetch(`/api/users/${userId}/boards/${boardId}/ballots`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(candidates),
      });
    })();
  }, [userId, boardId, candidates, draggedInit]);
}
