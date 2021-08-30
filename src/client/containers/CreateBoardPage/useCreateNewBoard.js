import postData from './postData';

export default async function AddNewBoard({
  newBoard,
  userId,
  members,
  setFinalResponse,
}) {
  try {
    await postData(`/api/users/${userId}/boards`, {
      title: newBoard.title,
      deadline: newBoard.deadline,
      banner: newBoard.banner,
    });
    const apiFetch = await fetch(`/api/users/${userId}/boards/created`);
    const apiResponse = await apiFetch.json();
    const mappedIds = apiResponse.map((res) => res.id);
    const boardId = mappedIds[mappedIds.length - 1];
    const response = await Promise.all(
      members.map((memberId) => {
        return postData(
          `/api/users/${userId}/boards/${boardId}/members/${memberId}`,
          {
            boardId,
            userId: memberId,
            role: 'basic',
          },
        );
      }),
    );
    const mappedResponse = response.map((res) => res.ok);
    if (mappedResponse.length > 0) {
      const everyResponse = mappedResponse.every((item) => item === true);
      if (everyResponse) setFinalResponse(true);
    }
  } catch (error) {
    throw new Error(error);
  }
}
