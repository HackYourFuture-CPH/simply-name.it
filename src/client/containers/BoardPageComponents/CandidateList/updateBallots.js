import { useEffect } from 'react';

export async function updateBallots(userId, boardId, candidates, draggedInit) {
  useEffect(() => {
    if (!draggedInit) {
      async function fetchData() {
        const response = await fetch(
          `/api/users/${userId}/boards/${boardId}/ballots`,
          {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(candidates),
          },
        );
        return response;
      }
      fetchData();
    }
  }, [candidates]);
}
