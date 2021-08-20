import React, { useState, useEffect } from 'react';
import './BoardPage.style.css';
import OwnerBoardPage from './OwnerBoardPage';
import MemberBoardPage from './MemberBoardPage';
import { useUser } from '../../firebase/UserContext';
import { useBoard } from './BoardProvider';

export default function BoardPage() {
  const boardContext = useBoard();
  const [boardInfo, setBoardInfo] = useState([]);
  const userInfo = useUser();
  console.log(userInfo);
  // const { userId, boardId } = useParams();
  const userId = 2;
  const boardId = 1;

  useEffect(() => {
    const fetchingBoardApi = async () => {
      const API_URL = `/api/users/${userId}/boards/${boardId}`;
      try {
        const apiResponse = await fetch(API_URL);
        const apiData = await apiResponse.json();
        setBoardInfo(apiData[0]);
        boardContext.setIsLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchingBoardApi();
  }, []);

  if (boardContext.isLoading) {
    return <div>LOADING....</div>;
  }

  return userId === boardInfo.creatorId ? (
    <OwnerBoardPage boardInfo={boardInfo} userInfo={userInfo} />
  ) : (
    <MemberBoardPage boardInfo={boardInfo} userInfo={userInfo} />
  );
}
