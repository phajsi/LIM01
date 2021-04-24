import React, { useState, useEffect } from 'react';

import {
  AppBar,
  Button,
  Card,
  Grid,
  CardContent,
  Typography,
  Toolbar,
  Paper,
  IconButton,
} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ChatBubble from '../ChatBubble/ChatBubble';
import forsaudio from '../../assets/audiofiles/forstaelseVoice.mp3';
import useStyles from './styles';
import exerciseStyles from '../exerciseStyle';
import ProgressBar from '../ProgressBar';
import NextExerciseBtn from '../NextExerciseBtn/NextExerciseBtn';
import { axiosInstanceGet } from '../../helpers/ApiFunctions';

// chat exercise component for playing.
const Forstaelse = ({
  id,
  showFeedback,
  progress,
  possible,
  restartSet,
  playAudio,
}) => {
  const className = useStyles();
  const classesBase = exerciseStyles();
  const classes = { ...className, ...classesBase };

  // Data for the forstaelse exercise from backend
  const [formData, setFormData] = useState({});

  // null if user hasn't given answer. "corrent" or "incorrect" if user has given answer
  const [answerState, setAnswerState] = useState(null);

  // keeps track of which task in the exercise the user is currently on.
  const [taskStep, setTaskStep] = useState(1);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibeScore] = useState(0);

  const [disabled, setDisabled] = useState(false);

  function getContent() {
    axiosInstanceGet()
      .get(`/forstaelse/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  function onClickAnswer(userAnswer) {
    if (formData[`answer${taskStep}`] === userAnswer) {
      setAnswerState('correct');
      setScore(score + 1);
      setTotalPossibeScore(totalPossibleScore + 1);
    } else {
      setAnswerState('incorrect');
      setTotalPossibeScore(totalPossibleScore + 1);
    }
  }

  // goes to next task or next exercise after user has played the current task
  const handleNextTask = () => {
    setAnswerState(null);
    // checks if there are more tasks in the exercise before incrementing the task count
    if (!formData[`chat${taskStep + 1}`]) {
      showFeedback(score, totalPossibleScore);
    } else {
      setTaskStep(taskStep + 1);
    }
  };

  function fireAudio() {
    setDisabled(true);
    playAudio(forsaudio);
    setTimeout(() => {
      setDisabled(false);
    }, 4000);
  }

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Paper className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar component="nav" className={classes.toolbar}>
          {restartSet()}
        </Toolbar>
      </AppBar>
      <div className={classes.topContent}>
        <div className={classes.progresscontainer}>
          <ProgressBar progress={progress} possible={possible} />
        </div>
        <Card>
          <CardContent className={classes.cardcontent}>
            <IconButton onClick={() => fireAudio()} disabled={disabled}>
              <VolumeUpIcon />
            </IconButton>
            <Typography
              variant="body2"
              component="p"
              className={classes.audiotext}
            >
              Les hva meldingen sier. Svar på spørsmålet.
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Paper className={classes.layout} elevation={0}>
        <Grid container spacing={3}>
          <ChatBubble chat={formData[`chat${taskStep}`]} />
          <Grid className={classes.gridText} item xs={12}>
            <hr />
            <p className={classes.text}>{formData[`question${taskStep}`]}</p>
          </Grid>
          {answerState === null && (
            <>
              <Grid item xs={6}>
                <Button
                  onClick={() => onClickAnswer('true')}
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  JA
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => onClickAnswer('false')}
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  NEI
                </Button>
              </Grid>
            </>
          )}
          {answerState !== null && (
            <p className={classes.explanation}>
              {formData[`explanation${taskStep}`]}
            </p>
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
