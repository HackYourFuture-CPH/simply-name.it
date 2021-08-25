import React, { useEffect, useState } from 'react';
import './BoardPage.style.css';
import OwnerBoardPage from './OwnerBoardPage';
import MemberBoardPage from './MemberBoardPage';
import { useBoard } from './BoardProvider';
import { useUser } from '../../firebase/UserContext';
import { useParams } from 'react-router-dom';

export default function BoardPage() {
  const [errorCode, setErrorCode] = useState(null);
  const {
    isBoardLoading,
    setBoardLoading,
    boardInfo,
    setBoardInfo,
  } = useBoard();
  const { boardId } = useParams();
  const { user } = useUser();
  const userId = user[0].id;

  useEffect(() => {
    const fetchingBoardApi = async () => {
      const API_URL = `/api/users/${userId}/boards/${boardId}`;
      try {
        const apiResponse = await fetch(API_URL);
        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          apiData[0].hasPassedDeadline = function () {
            const deadlineDate = new Date(this.deadline);
            const today = new Date();
            return today > deadlineDate;
          };
          setBoardInfo(apiData[0]);
          setBoardLoading(false);
        } else {
          const errorResult = await apiResponse.json();
          if (errorResult.error.startsWith('Incorrect entry Error')) {
            setErrorCode('no_such_board');
          }
          console.log('Fetching board info failed : ', errorResult);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    };
    (async () => {
      await fetchingBoardApi();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorCode !== null) {
    switch (errorCode) {
      case 'no_such_board':
        return (
          <div>
            No such board exists or you do not have access to this board.
          </div>
        );
      default:
        return <div>Unknown error occurred while fetching board</div>;
    }
  } else {
    if (isBoardLoading) {
      return <div>LOADING....</div>;
    }
    return userId === boardInfo.creatorId ? (
      <>
        {boardInfo.hasPassedDeadline()}
        <OwnerBoardPage boardInfo={boardInfo} />
      </>
    ) : (
      <>
        {boardInfo.hasPassedDeadline()}
        <MemberBoardPage boardInfo={boardInfo} />
      </>
    );
  }
}
