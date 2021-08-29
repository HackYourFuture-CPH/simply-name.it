import postData from './postData';

export default async function AddNewBoard(newBoard, userId, members) {
  try {
    await postData(`/api/users/${userId}/boards`, {
      title: newBoard.title,
      deadline: newBoard.deadline,
      banner: newBoard.banner,
    });
    const apiFetch = await fetch(`/api/users/${userId}/boards/created`);
    const response = await apiFetch.json();
    const mappedIds = response.map((res) => res.id);
    const boardId = mappedIds[mappedIds.length - 1];
    await Promise.all(
      members.map((memberId) => {
        return postData(
          `/api/users/${userId}/boards/${boardId}/members/${memberId}`,
          {
            boardId,
            userId: memberId,
          },
        );
      }),
    );
  } catch (error) {
    throw new Error(error);
  }
}
