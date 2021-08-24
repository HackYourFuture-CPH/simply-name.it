import postData from './postData';

export default async function AddNewBoard(newBoard, userId) {
  try {
    if (!newBoard.title) {
      console.log('Please enter a name for the board');
      return;
    }

    if (!newBoard.deadline) {
      console.log('Please provide a deadline for the board');
      return;
    }

    await postData(`/api/users/${userId}/boards`, {
      title: newBoard.title,
      deadline: newBoard.deadline,
      banner: newBoard.banner,
    });
  } catch (error) {
    throw new Error(error);
  }
}
