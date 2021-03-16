import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import Forstaelse from './Forstaelse/Forstaelse';
import Chat from './Chat/Chat';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const PlaySets = () => {
  // eslint-disable-next-line no-unused-vars
  const [step, setStep] = useState('menu');
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    forstaelse1: '',
    forstaelse2: '',
    chat1: '',
    chat2: '',
  });
  const [id, setId] = useState(null);

  const onChange = (e) => setId(e.target.value);

  function nextExercise() {
    // comment
  }

  function getContent(id) {
    axiosInstance
      .get(`/sets/${id}`)
      .then((res) => {
        setFormData(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  switch (step) {
    case 'menu':
      return (
        <div>
          <TextField
            type="number"
            name="id"
            variant="outlined"
            margin="dense"
            onChange={(e) => onChange(e)}
            fullWidth
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => getContent(id)}
            fullWidth
          >
            Opprett
          </Button>
        </div>
      );
    case 'forstaelse':
      return <Forstaelse id={id} nextExercise={nextExercise} />;
    case 'chat':
      return <Chat id={id} nextExercise={nextExercise} />;
    case 'finish':
      return <p>Finish</p>;
    default:
      return <p>default</p>;
  }
};

export default PlaySets;
