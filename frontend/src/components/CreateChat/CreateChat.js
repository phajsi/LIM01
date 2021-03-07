import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Paper } from '@material-ui/core';
import FormChat from '../FormChat';
import useStyles from '../CreateForstaelse/styles';

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

const CreateChat = ({ setStep }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    chatquestion: '',
    answer1: '',
    answer2: '',
    correctanswer: '',
    defaultreply: '',
    userreply: '',
    onChange: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClick = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/chat/', {
        chatquestion: formData.chatquestion,
        answer1: formData.answer1,
        answer2: formData.answer2,
        correctanswer: formData.correctanswer,
        defaultreply: formData.defaultreply,
        userreply: formData.userreply,
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  return (
    <Paper className={classes.root}>
      <h1>Chat</h1>
      <form onSubmit={(e) => onClick(e)} className={classes.form}>
        <h2> Oppgave </h2>
        <FormChat
          chatquestion="chatquestion"
          answer1="answer1"
          answer2="answer2"
          correctanswer="correctanswer"
          defaultreply="defaultreply"
          userreply="userreply"
          onChange={onChange}
        />
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button
              onClick={() => setStep('Menu')}
              className={classes.buttonRight}
              variant="contained"
              color="secondary"
            >
              AVBRYT
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Button type="Submit" variant="contained" color="primary">
              OPPRETT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateChat;
