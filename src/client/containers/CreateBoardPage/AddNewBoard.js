import postData from './postData';

export default async function AddNewBoard(newBoard, userId) {
  try {
    await postData(`/api/users/${userId}/boards`, {
      title: newBoard.title,
      deadline: newBoard.deadline,
      banner: newBoard.banner,
    });
  } catch (error) {
    throw new Error(error);
  }
}
