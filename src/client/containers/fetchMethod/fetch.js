import { getUserToken } from '../../firebase/googleAuth';
import { ApiError } from '../../ErrorBoundary';

export async function fetchFromDb(endpoint, fetchMethod, postBody = {}) {
  let token;
  try {
    token = await getUserToken();
  } catch (error) {
    throw new ApiError(error.message);
  }

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
  if (response.headers.get('content-type')) {
    const dbData = await response.json();
    return dbData;
  }
  return response;
}
