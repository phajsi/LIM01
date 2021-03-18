/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  AppBar,
  Card,
  CardHeader,
  Grid,
  Toolbar,
  Paper,
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { makeStyles } from '@material-ui/core/styles';
import NextExerciseBtn from '../components/NextExerciseBtn';

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
  navbar: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  stnField: {
    minHeight: '3em',
    backgroundColor: 'white',
    borderRadius: '11px',
    boxShadow: 'inset 0px 1px 6px rgba(147, 145, 145, 0.48)',
  },
  wordBtn: {
    textTransform: 'lowercase',
  },
}));

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const RyddeSetninger = ({ id, showFeedback }) => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    word1: '',
    wordClass1: '',
    word2: '',
    wordClass2: '',
    word3: '',
    wordClass3: '',
    word4: '',
    wordClass4: '',
    word5: '',
    wordClass5: '',
    word6: '',
    wordClass6: '',
    word7: '',
    wordClass7: '',
    word8: '',
    wordClass8: '',
    word9: '',
    wordClass9: '',
    word10: '',
    wordClass10: '',
  });

  const classes = useStyles();
  const [words, setWords] = useState([]);
  const [chosenWords, setChosenWords] = useState([]);
  const [wordClasses] = useState([]);
  const [rightAnswer, setRightAnswer] = useState();
  const [answerState, setAnswerState] = useState();
  const [score, setScore] = useState(0);
  let counter = 0;

  const filterFormData = (el) => {
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
    words.sort(() => Math.random() - 0.5);
  };

  const filterData = (responseData) => {
    Object.values(responseData).map((el) => filterFormData(el));
    setRightAnswer([...words]);
    randomizeWords();
  };

  function getContent() {
    axiosInstance
      .get(`/rydde_setninger/${id}`)
      .then((res) => {
        filterData(res.data);
        setFormData(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  const clicked = (e) => {
    chosenWords.push(e.currentTarget.value);
    const temp = [...words];
    temp.splice(e.currentTarget.id, 1);
    setWords(temp);
  };

  const removeWord = (e) => {
    words.push(e.currentTarget.value);
    const temp = [...chosenWords];
    temp.splice(e.currentTarget.id, 1);
    setChosenWords(temp);
  };

  const checkAnswer = () => {
    if (JSON.stringify(chosenWords) === JSON.stringify(rightAnswer)) {
      setAnswerState('correct');
      setScore(1);
    } else {
      setAnswerState('incorrect');
      setScore(0);
    }
  };

  const nextExercise = () => {
    showFeedback(score);
  };

  useEffect(() => {
    getContent();
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
                title="Trykk på ordene sånn at de kommer i
                 riktig rekkefølge. Husk å se på tegnsetting!"
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <div>
              {words.map((el, index) => (
                <Button
                  id={index}
                  className="wordBtn"
                  style={{ backgroundColor: '#21b6ae' }}
                  variant="contained"
                  value={el}
                  onClick={(e) => clicked(e)}
                >
                  {el}
                </Button>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.stnField}>
              {chosenWords.map((el, index) => (
                <Button
                  id={index}
                  color="secondary"
                  variant="contained"
                  value={el}
                  onClick={(e) => removeWord(e)}
                >
                  {el}
                </Button>
              ))}
            </div>
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Button
              variant="outlined"
              style={{ backgroundColor: 'white' }}
              onClick={checkAnswer}
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
