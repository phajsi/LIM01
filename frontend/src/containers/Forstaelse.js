import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardHeader } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ChatBubble from '../components/ChatBubble';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    maxWidth: theme.spacing(40),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  layout: {
    backgroundColor: '#f5f5f5',
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
  answerElement: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  answerElementWrong: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightcoral',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  answerBtn: {
    backgroundColor: 'white',
    marginRight: theme.spacing(1),
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

const Forstaelse = () => {
  // const [forstaelse, setForstaelse] = useState(null);
  const [question, setQuestion] = useState(null);
  const [chat, setChat] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [explanation, setExplanation] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [answerState, setAnswerState] = useState(null);

  const classes = useStyles();

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
  function getContent() {
    axiosInstance
      .get('/forstaelse/')
      .then((res) => {
        // setForstaelse(res.data[0]);
        setQuestion(res.data[0].question);
        setChat(res.data[0].chat);
        setAnswer(res.data[0].answer);
        setExplanation(res.data[0].explanation);
      })
      .catch((e) => {
        return e;
      });
  }

  function onClickTrue() {
    if (answer === 'true') {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  }

  function onClickFalse() {
    if (answer === 'false') {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  function renderSwitch(answerState) {
    switch (answerState) {
      case 'incorrect':
        return (
          <Grid item xs={12}>
            <p>{explanation}</p>
            <Card className={classes.answerElementWrong}>
              <CardHeader
                avatar={<CancelIcon style={{ color: 'white' }} />}
                title=" Feil! "
              />
              <Button className={classes.answerBtn} fullWidth size="small">
                <TrendingFlatIcon fontSize="large" />
              </Button>
            </Card>
          </Grid>
        );
      case 'correct':
        return (
          <Grid item xs={12}>
            <Card className={classes.answerElement}>
              <CardHeader
                avatar={<CheckCircleIcon style={{ color: 'white' }} />}
                title="Riktig!"
              />
              <Button className={classes.answerBtn} fullWidth size="small">
                <TrendingFlatIcon fontSize="large" />
              </Button>
            </Card>
          </Grid>
        );
      default:
        return (
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
        );
    }
  }

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
          {renderSwitch(answerState)}
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Forstaelse;
