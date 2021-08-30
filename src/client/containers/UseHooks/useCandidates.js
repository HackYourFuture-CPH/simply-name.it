import { useEffect, useState } from 'react';
import { useUser } from '../../firebase/UserContext';
import { useBoard } from '../BoardPage/BoardProvider';

export function useCandidates() {
  const { user } = useUser();
  const userId = user[0].id;
  const { boardInfo, isCandidateLoading, setIsCandidateLoading } = useBoard();
  const boardId = boardInfo.id;
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (!isCandidateLoading) return;
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
        setIsCandidateLoading(false);
      } else {
        setError(
          `Error fetching candidates: ${response.status}. ${response.statusText}`,
        );
      }
    })();
  }, [userId, boardId, setIsCandidateLoading, isCandidateLoading]);

  return { candidates, setCandidates, error };
}
