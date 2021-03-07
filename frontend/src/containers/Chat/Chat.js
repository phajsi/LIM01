/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, ButtonGroup, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import NextExerciseBtn from '../../components/NextExerciseBtn';
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

const Chat = () => {
  const [chatquestion, setChatquestion] = useState(null);
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [correctanswer, setCorrectanswer] = useState(null);
  const [userreply, setUserreply] = useState(null);
  const [answerchoice, setAnswerchoice] = useState('');
  const [answerstate, setAnswerstate] = useState(null);
  const [taskStep, setTaskStep] = useState(1);
  const [select, setSelect] = useState(false);
  // eslint-disable-next-line no-unused-vars

  const classes = useStyles();

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
  });

  function getContent() {
    axiosInstance.get('/chat/').then((res) => {
      setFormData(res.data[0]);
      setChatquestion(res.data[0].chatquestion1);
      setAnswer1(res.data[0].answer11);
      setAnswer2(res.data[0].answer12);
      setCorrectanswer(res.data[0].correctanswer1);
    });
  }

  function isTrue() {
    setTaskStep(taskStep + 1);
    if (answerchoice === correctanswer) {
      setAnswerstate('correct');
    } else {
      setAnswerstate('incorrect');
    }
  }

  console.log(taskStep);

  const handleNextTask = () => {
    setAnswerstate(null);
    if (taskStep === 2 && formData.chatquestion2 !== '') {
      setChatquestion(formData.chatquestion2);
      setAnswer1(formData.answer21);
      setAnswer2(formData.answer22);
      setCorrectanswer(formData.correctanswer2);
    }
    if (taskStep === 3 && formData.chatquestion3 !== '') {
      setChatquestion(formData.chatquestion3);
      setAnswer1(formData.answer31);
      setAnswer2(formData.answer32);
      setCorrectanswer(formData.correctanswer3);
    }
    ButtonGroup.attr('disabled', false);
    setSelect(true);
  };

  function onclick(answer) {
    setAnswerchoice(answer);
    ButtonGroup.attr('disabled', true);
  }

  useEffect(() => {
    getContent();
    setAnswerstate(null);
    isTrue();
    setSelect();
  }, [answerchoice]);

  return (
    <Paper className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper className={classes.layout} elevation={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.header}>
              <CardHeader
                avatar={<VolumeUpIcon />}
                title="Du har fått en melding! Trykk på det svaret som er riktig."
              />
            </Card>
          </Grid>
          <Grid>
            <ChatBubble chat={chatquestion} />
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
          >
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
            >
              <Button id={1} onClick={() => onclick(answer1)}>
                {answer1}
              </Button>
              <Button
                id={2}
                value="ALT2"
                onClick={() => onclick(answer2)}
                style={{ marginTop: 3 }}
              >
                {answer2}
              </Button>
              <Button
                id={3}
                value="ALT3"
                onClick={() => onclick(correctanswer)}
                style={{ marginTop: 3 }}
              >
                {correctanswer}
              </Button>
            </ButtonGroup>
            <NextExerciseBtn
              answerState={answerstate}
              handleNextTask={handleNextTask}
            />
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Chat;
