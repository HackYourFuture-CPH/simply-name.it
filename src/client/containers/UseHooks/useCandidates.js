import { useEffect, useState } from 'react';

export function useCandidates(userId, boardId) {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `/api/users/${userId}/boards/${boardId}/candidates`,
      );
      if (response.ok) {
        const candidatesData = await response.json();
        setCandidates(candidatesData);
      } else {
        setError(
          `Error fetching candidates: ${response.status}. ${response.statusText}`,
        );
      }
    })();
  }, []);

  return { candidates, error };
}
