import { useEffect, useState } from 'react';
import { useUser } from '../../firebase/UserContext';
import { useBoard } from '../BoardPage/BoardProvider';
import { ApiError } from '../../ErrorBoundary';
import { fetchFromDb } from '../fetchMethod/fetch';

export function useCandidates() {
  const { user } = useUser();
  const userId = user[0].id;
  const { boardInfo, isCandidateLoading, setIsCandidateLoading } = useBoard();
  const boardId = boardInfo.id;
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (!isCandidateLoading) return;
    (async () => {
      try {
        const candidatesData = await fetchFromDb(
          `${userId}/boards/${boardId}/candidates`,
          'get',
        );

        setCandidates(
          candidatesData.map((candidate) => {
            return {
              ...candidate,
              id: candidate.candidateId,
            };
          }),
        );
        setIsCandidateLoading(false);
      } catch (error) {
        throw new ApiError(error.message, error.statusCode);
      }
    })();
  }, [userId, boardId, setIsCandidateLoading, isCandidateLoading]);

  return { candidates, setCandidates };
}
