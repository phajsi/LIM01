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
import ChatBubble from '../components/ChatBubble';
import Answers from '../components/Answers';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F5F5F5',
    maxWidth: theme.spacing(40),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  layout: {
    backgroundColor: '#F5F5F5',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  text: {
    margin: theme.spacing(0),
  },
  gridText: {
    paddingBottom: theme.spacing(0),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  navbar: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
  },
}));

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
  const [answer, setAnswer] = useState(null);
  const [userreply, setUserreply] = useState(null);
  const [defaultreply, setDefaultreply] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [answerState, setAnswerState] = useState(null);

  const classes = useStyles();
  const answers = { answ1: 'alt1', answ2: 'alt2', correctAnsw: 'alt3' };
  const chat = 'disvdsnvfbpsdopvjdpnvpdsv f sdbv ac sah cadn dcfiadd ds v ';

  function test() {
    axiosInstance
      .post('/chat/', {
        chatquestion: 'hallo?',
        answer: 'true',
        defaultreply: 'hæ!',
        userreply: 'ja',
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return e;
      });
  }
  function getContent() {
    axiosInstance.get('/chat/').then((res) => {
      setChatquestion(res.data[0].chatquestion);
      setAnswer(res.data[0].answer);
      setDefaultreply(res.data[0].defaultreply);
      setUserreply(res.data[0].userreply);
    });
  }
  useEffect(() => {
    getContent();
  }, []);

  test();

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
            <ChatBubble chat={chat} />
          </Grid>
          <Answers answers={answers} />
        </Grid>
      </Paper>
    </Paper>
  );
};
export default Chat;
