import React, { useState } from 'react';
import './BoardPage.style.css';
import OwnerBoardPage from './OwnerBoardPage';
import MemberBoardPage from './MemberBoardPage';

export default function Board() {
  const [boardInfo, setBoardInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const { userId, boardId } = useParams();
  const userId = 2;
  const boardId = 1;

  const fetchingBoardApi = async () => {
    const API_URL = `/api/users/${userId}/boards/${boardId}`;
    try {
      const apiResponse = await fetch(API_URL);
      const apiData = await apiResponse.json();
      setBoardInfo(apiData[0]);
      setIsLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };
  if (isLoading) {
    fetchingBoardApi();
  }

  return (
    <div>
      {isLoading ? (
        <div>LOADING....</div>
      ) : (
        userId === boardInfo.creatorId && (
          <OwnerBoardPage boardInfo={boardInfo} />
        )
      )}
      {isLoading ? (
        <div>LOADING....</div>
      ) : (
        userId !== boardInfo.creatorId && (
          <MemberBoardPage boardInfo={boardInfo} />
        )
      )}
    </div>
  );
}
