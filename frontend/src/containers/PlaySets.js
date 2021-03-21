import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import Forstaelse from './Forstaelse/Forstaelse';
import Chat from './Chat/Chat';
import RyddeSetninger from './RyddeSetninger/RyddeSetninger';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const PlaySets = () => {
  const [step, setStep] = useState('menu');
  const [exercise, setExercise] = useState(0);
  const [exerciseId, setExerciseId] = useState(0);
  const [id, setId] = useState(null);
  const [IDs] = useState([]);
  const [exerciseTypes] = useState([]);
  const types = [
    'forstaelse',
    'forstaelse',
    'forstaelse',
    'forstaelse',
    'forstaelse',
    'chat',
    'chat',
    'chat',
    'chat',
    'chat',
    'ryddeSetninger',
    'ryddeSetninger',
    'ryddeSetninger',
    'ryddeSetninger',
    'ryddeSetninger',
  ];
  const [feedbackScore, setFeedBackScore] = useState(0);
  let counter = 0;

  const onChange = (e) => setId(e.target.value);

  /*
  nextExercise function will handle logic for going to the next exercise
  It checks if there are more exercises in the set, if not it changes the step to finish.
  If there are more exercises it will change ids and go to the exercise.
  */
  function nextExercise() {
    if (IDs.length < exercise + 1) {
      setStep('finish');
    } else {
      setExercise(exercise + 1);
      setStep(exerciseTypes[exercise]);
      setExerciseId(IDs[exercise]);
    }
  }

  /*
  checkExercises is a helper function that makes sure that only
  exercises with content can be played. 
  */
  function checkExercise(ex) {
    if (ex !== null && counter > 0) {
      IDs.push(ex);
      exerciseTypes.push(types[counter - 1]);
    }
    counter += 1;
  }

  function getContent(id) {
    axiosInstance
      .get(`/sets/${id}`)
      .then((res) => {
        Object.values(res.data).map((ex) => checkExercise(ex));
        setStep('overview');
      })
      .catch((e) => {
        return e;
      });
  }

  function showFeedback(score) {
    setFeedBackScore(score);
    setStep('feedback');
  }

  switch (step) {
    case 'menu':
      return (
        <div>
          <TextField
            type="number"
            name="id"
            variant="outlined"
            margin="dense"
            onChange={(e) => onChange(e)}
            fullWidth
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => getContent(id)}
            fullWidth
          >
            Choose
          </Button>
        </div>
      );
    case 'overview':
      return (
        <div>
          <h1>
            Click to play exercise set with id
            {id}
          </h1>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => nextExercise()}
            fullWidth
          >
            Spill
          </Button>
        </div>
      );
    case 'forstaelse':
      return <Forstaelse id={exerciseId} showFeedback={showFeedback} />;
    case 'chat':
      return <Chat id={exerciseId} showFeedback={showFeedback} />;
    case 'ryddeSetninger':
      return <RyddeSetninger id={exerciseId} showFeedback={showFeedback} />;
    case 'feedback':
      return (
        <div>
          <h1>
            Bra jobba bro, poensummen din er:
            {feedbackScore}
          </h1>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => nextExercise()}
            fullWidth
          >
            neste
          </Button>
        </div>
      );
    case 'finish':
      return <p>The set is completed</p>;
    default:
      return <p>default</p>;
  }
};

export default PlaySets;
