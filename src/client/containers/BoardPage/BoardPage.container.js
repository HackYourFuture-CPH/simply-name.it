import React, { useState, useEffect } from 'react';
import './BoardPage.style.css';
import OwnerBoardPage from './OwnerBoardPage';
import MemberBoardPage from './MemberBoardPage';
// import { useUser } from '../../firebase/UserContext';
import { useBoard } from './BoardProvider';

export default function BoardPage() {
  const { isBoardLoading } = useBoard();
  const { setBoardLoading } = useBoard();
  // const {user} = useUser();
  // console.log('user', user[0].id);
  const [boardInfo, setBoardInfo] = useState([]);

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
        setBoardLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };
    if (isBoardLoading) {
      fetchingBoardApi();
    }
  }, [isBoardLoading, setBoardLoading]);

  if (isBoardLoading) {
    return <div>LOADING....</div>;
  }

  return userId === boardInfo.creatorId ? (
    <>
      {/* <button type="button" onClick={() => setBoardLoading(true)} style={{position:"absolute",top:"0px",right:"0px"}}>test</button> */}
      <OwnerBoardPage boardInfo={boardInfo} />
    </>
  ) : (
    <MemberBoardPage boardInfo={boardInfo} />
  );
}
