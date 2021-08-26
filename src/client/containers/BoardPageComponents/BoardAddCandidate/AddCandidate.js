import postData from './PostData';

export default async function AddCandidate(
  newCandidate,
  userId,
  boardId,
  setBoardLoading,
) {
  try {
    await postData(`/api/users/${userId}/boards/${boardId}/candidates`, {
      name: newCandidate.name,
    });
    setBoardLoading(true);
  } catch (error) {
    throw new Error(error);
  }
}
