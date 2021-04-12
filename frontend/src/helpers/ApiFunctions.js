import axios from 'axios';

export function axiosInstance() {
  return axios.create({
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
}

export function axiosInstanceDelete() {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/`,
    timeout: 5000,
    headers: {
      // eslint-disable-next-line prettier/prettier
            'Authorization': `JWT ${localStorage.getItem('access')}`,
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
      // eslint-disable-next-line prettier/prettier
        accept: 'application/json',
    },
  });
}
