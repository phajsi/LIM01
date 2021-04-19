import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { axiosInstance } from '../helpers/ApiFunctions';
import SaveIcon from '../components/SaveIcon';
import happyPickle from '../assets/images/happyPickle.png';
import finalSad from '../assets/images/finalSad.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: 30,
    background: 'antiquewhite',
    padding: 30,
  },
  image: {
    maxWidth: 300,
    float: 'right',
  },
  text: {
    maxWidth: 600,
    marginBottom: 10,
    float: 'center',
    display: 'inline-block',
  },
});

const FinishedSet = ({
  totalScore,
  id,
  totalExercises,
  percentage,
  completed,
  isAuthenticated,
  setSteps,
  getContents,
}) => {
  const [rating, setRating] = useState({ rating: null });
  const [step, setStep] = useState('');

  const classes = useStyles();

  function getContent() {
    axiosInstance()
      .get(`/rating/${id}`)
      .then((res) => {
        setRating(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  /** The const will display different responces to different results from playing a set */
  const switchStep = () => {
    switch (step) {
      case 'over':
        return (
          <div>
            <div>
              <Typography variant="h3" className={classes.text}>
                Bra jobba!
              </Typography>
            </div>
            <div>
              <img
                src={happyPickle}
                alt="happy pickle"
                className={classes.image}
              />
            </div>
          </div>
        );
      case 'under':
        return (
          <div>
            <Typography variant="h3" className={classes.text}>
              Ikke værst!
            </Typography>
            <img
              src={finalSad}
              alt="Final sad pickle"
              width="100"
              className={classes.image}
            />
          </div>
        );
      default:
        return <p>default</p>;
    }
  };

  function scoreState() {
    if (percentage < 0.75) {
      setStep('under');
    } else {
      setStep('over');
    }
  }

  function postCompleted() {
    axiosInstance()
      .post(`/completed/`, { sets: id, score: totalScore })
      .catch((e) => {
        return e;
      });
  }
  function putCompleted() {
    axiosInstance()
      .put(`/completed/${completed.id}`, {
        score: totalScore,
        sets: id,
      })
      .catch((e) => {
        return e;
      });
  }

  useEffect(() => {
    if (isAuthenticated) {
      getContent();
      if (!completed.completed) {
        postCompleted();
      } else if (completed.completed && totalScore > completed.score) {
        putCompleted();
      }
    }
    scoreState();
  }, []);

  function onClickRating(rated) {
    const formData = {
      rating: rated,
      sets: id,
    };
    axiosInstance()
      .post(`/rating/`, formData)
      .then(() => {
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  function restartSet() {
    return (
      <Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getContents(id);
            setSteps('overview');
          }}
        >
          Til oversikten
        </Button>
      </Grid>
    );
  }

  return (
    <Paper elevation={0} className={classes.root}>
      {switchStep()}
      <Typography variant="h3">
        Din totale poengsum ble
        {` ${totalScore} `}
        av totalt
        {` ${totalExercises} `}
        mulige!
      </Typography>
      {isAuthenticated && (
        <>
          <Typography variant="h4">
            <br />
            Hvis du likte settet kan du gi det tommel opp
          </Typography>
          <Grid container spacing={1}>
            <IconButton onClick={() => onClickRating(true)}>
              {rating.rating ? (
                <ThumbUpIcon style={{ color: 'orange' }} />
              ) : (
                <ThumbUpIcon />
              )}
            </IconButton>
            <IconButton onClick={() => onClickRating(false)}>
              {rating.rating === false ? (
                <ThumbDownIcon style={{ color: 'blue' }} />
              ) : (
                <ThumbDownIcon />
              )}
            </IconButton>
            <SaveIcon id={id} />
          </Grid>
        </>
      )}
      <Grid container justify="center">
        {restartSet()}
        <Button
          variant="outlined"
          component={Link}
          to={isAuthenticated ? '/home' : '/'}
        >
          Hjem
        </Button>
      </Grid>
    </Paper>
  );
};

export default FinishedSet;
