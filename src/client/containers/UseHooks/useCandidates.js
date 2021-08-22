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
        setCandidates(
          candidatesData.map((candidate) => {
            return {
              ...candidate,
              id: candidate.candidateId,
            };
          }),
        );
      } else {
        setError(
          `Error fetching candidates: ${response.status}. ${response.statusText}`,
        );
      }
    })();
  }, [userId, boardId]);

  return { candidates, setCandidates, error };
}
