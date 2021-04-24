/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import {
  AppBar,
  Card,
  CardContent,
  Typography,
  Grid,
  Toolbar,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ryddaudio from '../../assets/audiofiles/ryddeSetningerVoice.mp3';
import ProgressBar from '../ProgressBar';
import NextExerciseBtn from '../NextExerciseBtn/NextExerciseBtn';
import useStyles from './styles';
import exerciseStyles from '../exerciseStyle';
import { axiosInstanceGet } from '../../helpers/ApiFunctions';

// ryddeSetninger exercise component for playing.
const RyddeSetninger = ({
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

  const [renderPage, setRenderPage] = useState();
  const [words] = useState([]);
  const [chosenWords, setChosenWords] = useState([]);
  const [wordWithColorCode, setWordWithColorCode] = useState([]);

  const [wordClasses] = useState([]);
  const [rightAnswer, setRightAnswer] = useState();
  const [answerState, setAnswerState] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPossibleScore, setTotalPossibeScore] = useState(0);

  const [disabled, setDisabled] = useState(false);

  let concatenatedWords = [];
  let counter = 0;

  // splits the words in the sentence from their wordclasses
  const splitData = (el) => {
    counter += 1;
    if (!(el === '' || typeof el === 'number')) {
      if (counter % 2 === 0) {
        words.push(el);
      } else {
        wordClasses.push(el);
      }
    }
  };

  const randomizeWords = () => {
    concatenatedWords.sort(() => Math.random() - 0.5);
  };

  const colorCodeTransform = (wordClass) => {
    switch (wordClass) {
      case 'det':
        return { backgroundColor: '#FDFF95' };
      case 'prp':
        return { backgroundColor: '#8EE7EF' };
      case 'pron':
        return { backgroundColor: '#9EFFFA' };
      case 'adv':
        return { backgroundColor: '#8EEF98' };
      case 'intj':
        return { backgroundColor: '#CDFFC0' };
      case 'v':
        return { backgroundColor: '#FA9D48' };
      case 'conj':
        return { backgroundColor: '#F3BB88' };
      case 'n':
        return { backgroundColor: '#EC6F6F' };
      case 'subj':
        return { backgroundColor: '#FF9E9E' };
      case 'adj':
        return { backgroundColor: '#D08EEF' };
      default:
        return { backgroundColor: '#E0E0E0' };
    }
  };

  const filterData = (data) => {
    Object.values(data).map((el) => splitData(el));
    setRightAnswer([...words]);
    concatenatedWords = words.map(function (e, i) {
      return [words[i], wordClasses[i]];
    });
    randomizeWords();
    concatenatedWords.forEach(function (item, index, array) {
      const hexCode = colorCodeTransform(item[1]);
      concatenatedWords[index].splice(1, 1, hexCode);
    });
    setWordWithColorCode([...concatenatedWords]);
  };

  function getContent() {
    axiosInstanceGet()
      .get(`/rydde_setninger/${id}`)
      .then((res) => {
        filterData(res.data);
        setRenderPage((renderPage) => renderPage + 1);
      })
      .catch((e) => {
        return e;
      });
  }

  const clicked = (e, el) => {
    chosenWords.push(el);
    const temp = [...wordWithColorCode];
    temp.splice(e.currentTarget.id, 1);
    setWordWithColorCode(temp);
  };

  const removeWord = (e, el) => {
    wordWithColorCode.push(el);
    const temp = [...chosenWords];
    temp.splice(e.currentTarget.id, 1);
    setChosenWords(temp);
  };

  const checkAnswer = () => {
    setDisableButton(true);
    const finalSentence = chosenWords.map((el) => el[0]);
    if (JSON.stringify(finalSentence) === JSON.stringify(rightAnswer)) {
      setAnswerState('correct');
      setScore(1);
      setTotalPossibeScore(totalPossibleScore + 1);
    } else {
      setAnswerState('incorrect');
      setScore(0);
      setTotalPossibeScore(totalPossibleScore + 1);
    }
  };

  const nextExercise = () => {
    showFeedback(score, totalPossibleScore);
  };

  function fireAudio() {
    setDisabled(true);
    playAudio(ryddaudio);
    setTimeout(() => {
      setDisabled(false);
    }, 6000);
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
              Trykk på ordene sånn at de kommer i riktig rekkefølge. Husk å
              sjekke tegnsettingen!
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Paper className={classes.layout} elevation={0}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div style={{ alignSelf: 'center' }}>
              {wordWithColorCode.map((el, index) => (
                <Button
                  id={index}
                  value={el[0]}
                  style={el[1]}
                  className={classes.wordBtn}
                  variant="contained"
                  disabled={disableButton}
                  onClick={(e) => clicked(e, el)}
                >
                  {el[0]}
                </Button>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.chosenWords}>
              {chosenWords.map((el, index) => (
                <Button
                  id={index}
                  value={el[0]}
                  style={el[1]}
                  className={classes.wordBtn}
                  variant="contained"
                  disabled={disableButton}
                  onClick={(e) => removeWord(e, el)}
                >
                  {el[0]}
                </Button>
              ))}
            </div>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Button
              variant="contained"
              disabled={disableButton}
              onClick={checkAnswer}
              className={classes.checkAnswerBtn}
            >
              Sjekk svar
            </Button>
          </Grid>
          <NextExerciseBtn
            answerState={answerState}
            handleNextTask={nextExercise}
          />
        </Grid>
      </Paper>
    </Paper>
  );
};

export default RyddeSetninger;
