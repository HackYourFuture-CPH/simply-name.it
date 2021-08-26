export async function deleteCandidate(
  userId,
  boardId,
  candidateId,
  setBoardLoading,
) {
  const response = await fetch(
    `/api/users/${userId}/boards/${boardId}/candidates/${candidateId}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  setBoardLoading(true);
  return response;
}
