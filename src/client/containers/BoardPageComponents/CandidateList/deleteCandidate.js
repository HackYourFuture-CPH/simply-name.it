export async function deleteCandidate(userId, boardId, candidateId) {
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
  if (!response.ok) {
    throw new Error(response.statusText, response.status);
  } else {
    return response;
  }
}
