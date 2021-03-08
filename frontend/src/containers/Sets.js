import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});
const axiosInstance2 = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const Sets = () => {
  const [formData, setFormData] = useState({
    forstaelse1: '',
    forstaelse2: '',
    chat1: '',
    chat2: '',
  });

  const { forstaelse1, forstaelse2, chat1, chat2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function getContent(pk) {
    axiosInstance
      .get(`/sets/${pk}`)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        return e;
      });
  }
  function postContent(e) {
    e.preventDefault();
    axiosInstance2
      .post('/createsets/', {
        forstaelse1: formData.forstaelse1,
        forstaelse2: formData.forstaelse2,
        chat1: formData.chat1,
        chat2: formData.chat2,
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }
  return (
    <div>
      <div>
        <h1>Sets</h1>
        <button onClick={() => getContent(1)} type="button">
          get sets
        </button>
        <form onSubmit={(e) => postContent(e)}>
          <TextField
            type="number"
            placeholder="forstaelse"
            name="forstaelse1"
            variant="outlined"
            margin="dense"
            value={forstaelse1}
            onChange={(e) => onChange(e)}
            fullWidth
          />
          <TextField
            type="number"
            name="forstaelse2"
            variant="outlined"
            margin="dense"
            value={forstaelse2}
            onChange={(e) => onChange(e)}
            fullWidth
          />
          <TextField
            type="number"
            name="chat1"
            variant="outlined"
            margin="dense"
            value={chat1}
            onChange={(e) => onChange(e)}
            fullWidth
          />
          <TextField
            type="number"
            name="chat2"
            variant="outlined"
            margin="dense"
            value={chat2}
            onChange={(e) => onChange(e)}
            fullWidth
          />
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Opprett
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Sets;
