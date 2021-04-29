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
import axios from 'axios';
import ChatBubble from '../ChatBubble/ChatBubble';
import forsaudio from '../../assets/audiofiles/forstaelseVoice.mp3';
import useStyles from './styles';
import exerciseStyles from '../exerciseStyle';
import ProgressBar from '../ProgressBar';
import NextExerciseBtn from '../NextExerciseBtn/NextExerciseBtn';

/**
 * This is the forstaelse exercise component that is playable from Playsets.
 * @author Simen, Phajsi
 * @param {object} props
 * @property {integer} id of the forstaelse exercise being played.
 * @property {function} showFeedback tracks a user's score when playing an exercise in a set and
 * which feedback case to show after finishing the exercise.
 * @property {integer} progress counts how many exercises the user has played.
 * @property {integer} possible total exercises in the set.
 * @property {function} restartSet sets setStep in Playsets to "overview" so the user can exit
 * the exercise set from any exercise.
 * @property {function} playAudio returns a new HTMLAudioElement.
 * @returns a forstaelse exercise instance.
 */
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

  // Data for the forstaelse exercise from backend.
  const [formData, setFormData] = useState({});

  // Null if user hasn't given answer, "correct" or "incorrect" if user has given answer.
  const [answerState, setAnswerState] = useState(null);

  // Keeps track of which task in the exercise the user is currently on.
  const [taskStep, setTaskStep] = useState(1);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibeScore] = useState(0);

  const [disabled, setDisabled] = useState(false);

  // Gets the exercise content with {id} from backend.
  function getContent() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/forstaelse/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((res) => {
        setFormData(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  // Updates states after a user has clicked on an answer.
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

  // Goes to next task or next exercise after user has played the current task.
  const handleNextTask = () => {
    setAnswerState(null);
    // Checks if there are more tasks in the exercise before incrementing the task count.
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
            <IconButton
              onClick={() => fireAudio()}
              disabled={disabled}
              data-testid="volumeForstaelse"
            >
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
