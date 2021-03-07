/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import Answers from '../../components/Answers';
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
    console.log(answerchoice, 'dette er svaret jeg trykte på');
    console.log(correctanswer, 'dette er svaret jeg forventet');
    if (answerchoice === correctanswer) {
      setAnswerstate('istrue');
      // console.log(answerstate, 'dette skal være sant');
    } else {
      setAnswerstate('isfalse');
      // console.log(answerstate, 'dette skal være USANT');
    }
  }

  function renderSwitch(answerstate) {
    switch (answerstate) {
      case 'istrue':
        return (
          <Grid>
            <ChatBubble chat={answerchoice} />
          </Grid>
        );
      case 'isfalse':
        return (
          <Grid>
            <ChatBubble chat={answerchoice} />
          </Grid>
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    getContent();
    isTrue();
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
          <Answers
            answer1={answer1}
            answer2={answer2}
            correctanswer={correctanswer}
            setAnswerchoice={setAnswerchoice}
          />
          {renderSwitch(answerstate)}
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Chat;
