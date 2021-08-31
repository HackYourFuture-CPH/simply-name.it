import { getUserToken } from '../../firebase/googleAuth';
import { ApiError } from '../../ErrorBoundary';

export async function fetchFromDb(endpoint, fetchMethod, postBody = {}) {
  const token = await getUserToken();
  const fetchOptions = {
    method: fetchMethod,
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  };
  if (fetchMethod === 'post' || fetchMethod === 'put') {
    fetchOptions.body = JSON.stringify(postBody);
  }
  const response = await fetch(`/api/users/${endpoint}`, fetchOptions);
  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
  const dbData = await response.json();
  return dbData;
}
