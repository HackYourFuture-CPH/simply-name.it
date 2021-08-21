import { useEffect, useState } from 'react';

export function useUpdateBallots(userId, boardId, candidatesBody) {
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/users/${userId}/boards/${boardId}/ballots`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(candidatesBody),
        },
      );
      if (!response.ok) {
        setError(
          `Error fetching candidates: ${response.status}. ${response.statusText}`,
        );
      }
    })();
  }, [userId, boardId, candidatesBody]);

  return { error };
}
