import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  AppBar,
  Button,
  Card,
  Grid,
  CardHeader,
  Toolbar,
  Paper,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import useStyles from './styles';
import NextExerciseBtn from '../../components/NextExerciseBtn';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const Forstaelse = ({ preview, createFormData }) => {
  // const [forstaelse, setForstaelse] = useState(null);

  const [formData, setFormData] = useState({
    chat1: '',
    question1: '',
    answer1: 'true',
    explanation1: '',
    chat2: '',
    question2: '',
    answer2: 'true',
    explanation2: '',
    chat3: '',
    question3: '',
    answer3: 'true',
    explanation3: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [answerState, setAnswerState] = useState(null);
  const [chat, setChat] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [taskStep, setTaskStep] = useState(1);

  const classes = useStyles();

  function getContent() {
    axiosInstance
      .get('/forstaelse/')
      .then((res) => {
        setFormData(res.data[0]);
        setChat(res.data[0].chat1);
        setQuestion(res.data[0].question1);
        setAnswer(res.data[0].answer1);
        setExplanation(res.data[0].explanation1);
      })
      .catch((e) => {
        return e;
      });
  }

  function onClickTrue() {
    setTaskStep(taskStep + 1);
    if (answer === 'true') {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  }

  function onClickFalse() {
    setTaskStep(taskStep + 1);
    if (answer === 'false') {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  }

  const handleNextTask = () => {
    setAnswerState(null);
    if (taskStep === 2 && formData.chat2 !== '') {
      setChat(formData.chat2);
      setQuestion(formData.question2);
      setAnswer(formData.answer2);
      setExplanation(formData.explanation2);
    }
    if (taskStep === 3 && formData.chat3 !== '') {
      setChat(formData.chat3);
      setQuestion(formData.question3);
      setAnswer(formData.answer3);
      setExplanation(formData.explanation3);
    }
  };

  useEffect(() => {
    if (preview) {
      setFormData(createFormData);
      setChat(createFormData.chat1);
      setQuestion(createFormData.question1);
      setAnswer(createFormData.answer1);
      setExplanation(createFormData.explanation1);
    } else {
      getContent();
    }
  }, []);

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
                title="Les hva Sarmi sier. Svar på spørsmålet"
              />
            </Card>
          </Grid>
          <ChatBubble chat={chat} />
          <Grid className={classes.gridText} item xs={12}>
            <hr />
            <p className={classes.text}>{question}</p>
          </Grid>

          {answerState === null && (
            <>
              <Grid item xs={6}>
                <Button
                  onClick={onClickTrue}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  JA
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={onClickFalse}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  NEI
                </Button>
              </Grid>
            </>
          )}
          {answerState !== null && (
            <p className={classes.explanation}>{explanation}</p>
          )}
          <NextExerciseBtn
            answerState={answerState}
            handleNextTask={handleNextTask}
          />
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Forstaelse;
