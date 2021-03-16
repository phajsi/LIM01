import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
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
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const Chat = ({ id, showFeedback }) => {
  const [chatquestion, setChatquestion] = useState(null);
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [correctanswer, setCorrectanswer] = useState(null);
  const [answerchoice, setAnswerchoice] = useState(null);
  const [answerstate, setAnswerstate] = useState(null);
  const [taskStep, setTaskStep] = useState(1);
  const [select, setSelect] = useState(false);
  const [score, setScore] = useState(0);

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
    axiosInstance.get(`/chat/${id}`).then((res) => {
      setFormData(res.data);
      setChatquestion(res.data.chatquestion1);
      setAnswer1(res.data.answer11);
      setAnswer2(res.data.answer12);
      setCorrectanswer(res.data.correctanswer1);
    });
  }

  function isTrue() {
    if (taskStep < 4) {
      setTaskStep(taskStep + 1);
      if (answerchoice === correctanswer) {
        setAnswerstate('correct');
        setScore(score + 1);
      } else {
        setAnswerstate('incorrect');
      }
    }
    // eslint-disable-next-line no-restricted-globals
    return null;
  }

  const handleNextTask = () => {
    setAnswerstate(null);
    if (taskStep === 2 && formData.chatquestion2 !== '') {
      setChatquestion(formData.chatquestion2);
      setAnswer1(formData.answer21);
      setAnswer2(formData.answer22);
      setCorrectanswer(formData.correctanswer2);
    } else if (taskStep === 3 && formData.chatquestion3 !== '') {
      setChatquestion(formData.chatquestion3);
      setAnswer1(formData.answer31);
      setAnswer2(formData.answer32);
      setCorrectanswer(formData.correctanswer3);
    } else {
      showFeedback(score);
    }
    setSelect(false);
  };

  function validateChoice() {
    if (answerchoice != null) {
      isTrue();
      setSelect(true);
    }
  }

  useEffect(() => {
    if (chatquestion === null) {
      getContent();
    }
    validateChoice();
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
          <ChatBubble chat={chatquestion} />
          {select === true && <ChatBubble chat={answerchoice} />}
          <Grid
            container
            direction="column"
            justify="flex-end"
            alignItems="flex-end"
          >
            {answerstate === null && (
              <>
                <ButtonGroup
                  orientation="vertical"
                  color="primary"
                  aria-label="vertical contained primary button group"
                  variant="contained"
                >
                  <Button id={1} onClick={() => setAnswerchoice(answer1)}>
                    {answer1}
                  </Button>
                  <Button
                    onClick={() => setAnswerchoice(answer2)}
                    style={{ marginTop: 3 }}
                  >
                    {answer2}
                  </Button>
                  <Button
                    onClick={() => setAnswerchoice(correctanswer)}
                    style={{ marginTop: 3 }}
                  >
                    {correctanswer}
                  </Button>
                </ButtonGroup>
              </>
            )}
            <NextExerciseBtn
              answerState={answerstate}
              handleNextTask={handleNextTask}
            />
            {taskStep > 3 && <p>You have finished this set</p>}
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Chat;
