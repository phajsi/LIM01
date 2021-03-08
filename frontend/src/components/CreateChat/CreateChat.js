import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Paper, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
  const [taskAmount, setTaskAmount] = useState(1);
  const [formData, setFormData] = useState({
    chatquestion1: '',
    answer11: '',
    answer12: '',
    correctanswer1: '',
    chatquestion2: '',
    answer21: '',
    answer22: '',
    correctanswer2: '',
    chatquestion3: '',
    answer31: '',
    answer32: '',
    correctanswer3: '',
    onChange: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClick = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/createchat/', {
        chatquestion1: formData.chatquestion1,
        answer11: formData.answer11,
        answer12: formData.answer12,
        correctanswer1: formData.correctanswer1,
        chatquestion2: formData.chatquestion2,
        answer21: formData.answer21,
        answer22: formData.answer22,
        correctanswer2: formData.correctanswer2,
        chatquestion3: formData.chatquestion3,
        answer31: formData.answer31,
        answer32: formData.answer32,
        correctanswer3: formData.correctanswer3,
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  const removeTask = () => {
    if (taskAmount === 2) {
      setFormData({
        ...formData,
        chatquestion2: '',
        answer21: '',
        answer22: '',
        correctanswer2: '',
      });
    }
    if (taskAmount === 3) {
      setFormData({
        ...formData,
        chatquestion3: '',
        answer31: '',
        answer32: '',
        correctanswer3: '',
      });
    }
    setTaskAmount(taskAmount - 1);
  };

  return (
    <Paper className={classes.root}>
      <h1>Chat</h1>
      <form onSubmit={(e) => onClick(e)} className={classes.form}>
        <h2> Tema 1 </h2>
        <FormChat
          chatquestion="chatquestion1"
          answer1="answer11"
          answer2="answer12"
          correctanswer="correctanswer1"
          onChange={onChange}
        />
        {taskAmount > 1 && (
          <>
            <hr />
            <h2> Tema 2 </h2>
            <FormChat
              chatquestion="chatquestion2"
              answer1="answer21"
              answer2="answer22"
              correctanswer="correctanswer2"
              onChange={onChange}
            />
          </>
        )}
        {taskAmount > 2 && (
          <>
            <hr />
            <h2> Tema 3 </h2>
            <FormChat
              chatquestion="chatquestion3"
              answer1="answer31"
              answer2="answer32"
              correctanswer="correctanswer3"
              onChange={onChange}
            />
          </>
        )}
        <div className={classes.addIcon}>
          {taskAmount > 1 && (
            <Fab
              className={classes.innerMargin}
              size="small"
              onClick={() => removeTask()}
              variant="contained"
            >
              <RemoveIcon />
            </Fab>
          )}
          {taskAmount < 3 && (
            <Fab
              className={classes.innerMargin}
              size="small"
              onClick={() => setTaskAmount(taskAmount + 1)}
              variant="contained"
            >
              <AddIcon />
            </Fab>
          )}
        </div>
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
