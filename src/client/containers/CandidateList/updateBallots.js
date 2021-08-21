export async function updateBallots(userId, boardId, candidatesBody) {
  const response = await fetch(
    `/api/users/${userId}/boards/${boardId}/ballots`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(candidatesBody),
    },
  );
  return response;
}
