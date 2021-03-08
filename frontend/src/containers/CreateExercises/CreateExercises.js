import React, { useState } from 'react';
import axios from 'axios';
import { Paper, MenuList, MenuItem, Button } from '@material-ui/core';
import CreateExerciseModal from '../../components/ExerciseModal';
import CreateForstaelse from '../../components/CreateForstaelse/CreateForstaelse';
import CreateChat from '../../components/CreateChat/CreateChat';
import useStyles from './styles';

const axiosInstance = axios.create({
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

const CreateExercises = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    forstaelse1: '',
    forstaelse2: '',
    chat1: '',
    chat2: '',
  });
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

  function updateFormDataForstaelse(id) {
    if (formData.forstaelse1 === '') {
      setFormData({ ...formData, forstaelse1: id });
    } else {
      setFormData({ ...formData, forstaelse2: id });
    }
  }

  function updateFormDataChat(id) {
    if (formData.chat1 === '') {
      setFormData({ ...formData, chat1: id });
    } else {
      setFormData({ ...formData, chat2: id });
    }
  }

  function postContent() {
    axiosInstance
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
          <Button
            variant="contained"
            color="secondary"
            onClick={postContent}
            fullWidth
          >
            Opprett
          </Button>
        </Paper>
      );
    case 'Chat':
      return (
        <CreateChat updateFormDataChat={updateFormDataChat} setStep={setStep} />
      );
    case 'Forståelse':
      return (
        <CreateForstaelse
          updateFormDataForstaelse={updateFormDataForstaelse}
          setStep={setStep}
        />
      );
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
