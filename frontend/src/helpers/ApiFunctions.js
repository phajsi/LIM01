import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
      Authorization: `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
      accept: 'application/json',
  },
});

export const axiosInstanceDelete = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    accept: 'application/json',
  },
});
