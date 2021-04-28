import axios from 'axios';

/*
 * Axios instances to avoid repetition. They include header info and base url which
 * are the same for all backend requests.
 */

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
