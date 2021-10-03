import React, { useEffect, useState } from 'react';
import './BoardPage.style.css';
import OwnerBoardPage from './OwnerBoardPage';
import MemberBoardPage from './MemberBoardPage';
import { useBoard } from './BoardProvider';
import { useUser } from '../../firebase/UserContext';
import { useParams } from 'react-router-dom';
import { fetchFromDb } from '../fetchMethod/fetch';

export default function BoardPage() {
  const { boardInfo, setBoardInfo } = useBoard();
  const { boardId } = useParams();
  const { user } = useUser();
  const userId = user[0].id;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchingBoardApi = async () => {
      const API_URL = `${userId}/boards/${boardId}`;
      const apiData = await fetchFromDb(API_URL, 'get');
      apiData[0].hasPassedDeadline = function () {
        const deadlineDate = new Date(apiData[0].deadline);
        const today = new Date();
        return today > deadlineDate;
      };
      setBoardInfo(apiData[0]);
      setIsLoading(false);
    };
    (async () => {
      await fetchingBoardApi();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>LOADING....</div>;
  }
  return userId === boardInfo.creatorId ? (
    <>
      <OwnerBoardPage />
    </>
  ) : (
    <>
      <MemberBoardPage />
    </>
  );
}
