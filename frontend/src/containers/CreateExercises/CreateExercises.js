import React, { useState } from 'react';
import axios from 'axios';
import { Paper, MenuList, MenuItem } from '@material-ui/core';
import CreateExerciseModal from '../../components/ExerciseModal';
import CreateForstaelse from '../../components/CreateForstaelse/CreateForstaelse';
import CreateChat from '../../components/CreateChat/CreateChat';
import useStyles from './styles';

const axiosInstance = axios.create({
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

const CreateExercises = () => {
  const classes = useStyles();

  const [step, setStep] = useState('Menu');
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleClickOpen = (e) => {
    setOpen(true);
    setId(e.target.id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNext = (id) => {
    setOpen(false);
    setStep(id);
  };

  // eslint-disable-next-line no-unused-vars
  function test() {
    axiosInstance
      .post('/forstaelse/', {
        chat: 'sdfgbfhbfhb',
        question: 'dfhbaefhbn',
        answer: 'true',
        explanation: 'adhgtaeth',
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }
  switch (step) {
    case 'Menu':
      return (
        <Paper className={classes.root}>
          <h1>Velg oppgavetype</h1>
          <MenuList>
            <MenuItem onClick={(e) => handleClickOpen(e)} id="Chat">
              Chat
            </MenuItem>
            <MenuItem onClick={(e) => handleClickOpen(e)} id="Forståelse">
              Forståelse
            </MenuItem>
            <MenuItem onClick={(e) => handleClickOpen(e)} id="Rydde Setninger">
              Rydde Setninger
            </MenuItem>
          </MenuList>
          <CreateExerciseModal
            open={open}
            handleClose={handleClose}
            id={id}
            handleNext={handleNext}
          />
        </Paper>
      );
    case 'Chat':
      return <CreateChat setStep={setStep} />;
    case 'Forståelse':
      return <CreateForstaelse setStep={setStep} />;
    case 'Rydde Setninger':
      return (
        <Paper>
          <h2>Rydde Setninger</h2>
        </Paper>
      );
    default:
      return <> </>;
  }
};

export default CreateExercises;
