import axios from 'axios';

/**
 * Axios instances to avoid repetition. They include header info and base url which
 * are the same for all backend requests.
 * @author Phajsi, Simen
 */

// Regular instance with authorization and content-type for specifying that the body of request should be json.
export function axiosInstance() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/`,
    timeout: 5000,
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
}

// Delete instance wihout content type because the delete requests do not need a request body.
export function axiosInstanceDelete() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/`,
    timeout: 5000,
    headers: {
      Authorization: `JWT ${localStorage.getItem('access')}`,
      accept: 'application/json',
    },
  });
}

// Get instance without authorization details in the header. used for get requests that should be available for anyone.
export function axiosInstanceGet() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/`,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
}
