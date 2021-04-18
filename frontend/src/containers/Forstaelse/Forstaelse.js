import React, { useState, useEffect } from 'react';

import {
  AppBar,
  Button,
  Card,
  Grid,
  CardHeader,
  Toolbar,
  Paper,
} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ChatBubble from '../../components/ChatBubble/ChatBubble';
import useStyles from './styles';
import ProgressBar from '../../components/ProgressBar';
import NextExerciseBtn from '../../components/NextExerciseBtn/NextExerciseBtn';
import { axiosInstanceGet } from '../../helpers/ApiFunctions';

const Forstaelse = ({ id, showFeedback, progress, possible, restartSet }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({});
  const [answerState, setAnswerState] = useState(null);
  const [taskStep, setTaskStep] = useState(1);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibeScore] = useState(0);

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

  const handleNextTask = () => {
    setAnswerState(null);
    if (!formData[`chat${taskStep + 1}`]) {
      showFeedback(score, totalPossibleScore);
    } else {
      setTaskStep(taskStep + 1);
    }
  };

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
      <Paper className={classes.layout} elevation={0}>
        <div className={classes.progresscontainer}>
          <ProgressBar progress={progress} possible={possible} />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className={classes.header}>
              <CardHeader
                avatar={<VolumeUpIcon />}
                title="Les hva meldingen sier. Svar på spørsmålet"
              />
            </Card>
          </Grid>
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
                  color="primary"
                  fullWidth
                >
                  JA
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => onClickAnswer('false')}
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
