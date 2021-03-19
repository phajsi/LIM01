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
  pron: {
    backgroundColor: 'FDFF95',
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
  // slette denne
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
  const [newWords, setNewWords] = useState([]);
  const [newWordClasses] = useState([]);
  const [colorCodes, setColorCodes] = useState([]);

  const [wordClasses, setWordClasses] = useState([]);
  const [rightAnswer, setRightAnswer] = useState();
  const [answerState, setAnswerState] = useState();
  const [score, setScore] = useState(0);

  let concatWord = [];
  let splitWord = [];
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
    concatWord.sort(() => Math.random() - 0.5);
  };

  const addColorCode = (e) => {
    switch (e) {
      case 'det':
        colorCodes.push({ backgroundColor: '#FDFF95' });
        return null;
      case 'prp':
        colorCodes.push({ backgroundColor: '#8EE7EF' });
        return null;
      case 'pron':
        colorCodes.push({ backgroundColor: '#9EFFFA' });
        return null;
      case 'adv':
        colorCodes.push({ backgroundColor: '#8EEF98' });
        return null;
      case 'intj':
        colorCodes.push({ backgroundColor: '#CDFFC0' });
        return null;
      case 'v':
        colorCodes.push({ backgroundColor: '#FA9D48' });
        return null;
      case 'conj':
        colorCodes.push({ backgroundColor: '#F3BB88' });
        return null;
      case 'n':
        colorCodes.push({ backgroundColor: '#EC6F6F' });
        return null;
      case 'subj':
        colorCodes.push({ backgroundColor: '#FF9E9E' });
        return null;
      case 'adj':
        colorCodes.push({ backgroundColor: '#D08EEF' });
        return null;
      default:
        colorCodes.push({ backgroundColor: '#gray' });
        return null;
    }
  };

  const filterData = (responseData) => {
    Object.values(responseData).map((el) => filterFormData(el));
    setRightAnswer([...words]);
    concatWord = words.map(function (e, i) {
      return `${words[i]}&${wordClasses[i]}`;
    });
    randomizeWords();
    splitWord = concatWord.map(function (e, i) {
      return e.split('&');
    });
    console.log('split', splitWord);
    const split = splitWord.map(function (e, i) {
      newWords.push(e[0]);
      newWordClasses.push(e[1]);
      addColorCode(e[1]);
      return null;
    });
    console.log('colorCodes', colorCodes);
    console.log('newwords', newWords);
    console.log('newwordclass', newWordClasses);
  };
  //  Husk å bytte tilbake til når oppgaven er ferdig
  // .get(`/rydde_setninger/${id}`)
  function getContent() {
    axiosInstance
      .get(`/rydde_setninger/1`)
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
    const temp = [...newWords];
    temp.splice(e.currentTarget.id, 1);
    setNewWords(temp);
  };

  const removeWord = (e) => {
    newWords.push(e.currentTarget.value);
    const temp = [...chosenWords];
    temp.splice(e.currentTarget.id, 1);
    setChosenWords(temp);
  };

  const checkAnswer = () => {
    console.log(concatWord);
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
              {newWords.map((el, index) => (
                <Button
                  style={colorCodes[index]}
                  id={index}
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
                  style={colorCodes[index]}
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
