import postData from './PostData';

export default async function AddCandidate(
  newCandidate,
  userId,
  boardId,
  setBoardLoading,
) {
  try {
    if (!newCandidate.name) {
      console.log('Please put a candidate name');
      return;
    }

    if (!isNaN(newCandidate.name)) {
      console.log('Candidate name can not be number');
      return;
    }

    await postData(`/api/users/${userId}/boards/${boardId}/candidates`, {
      name: newCandidate.name,
    });
    setBoardLoading(true);
    setBoardLoading(false);
  } catch (error) {
    throw new Error(error);
  }
}
