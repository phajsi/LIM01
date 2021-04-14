import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import happyPickle from '../assets/images/happyPickle.png';
import { axiosInstance, axiosInstanceDelete } from '../helpers/ApiFunctions';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: 'auto',
    background: 'transparent',
  },
  image: {
    maxWidth: 300,
    float: 'right',
  },
});

const FinishedSet = ({
  totalScore,
  id,
  totalExercises,
  percentage,
  completed,
  isAuthenticated,
}) => {
  const [rating, setRating] = useState({ rating: null });
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState('');

  const classes = useStyles();

  function getContent() {
    const requestOne = axiosInstance().get(`/rating/${id}`);
    const requestTwo = axiosInstance().get(`/usersaved/${id}`);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...res) => {
          setRating(res[0].data);
          setSaved(res[1].data.saved);
        })
      )
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
            <Typography variant="h3">Bra jobba!</Typography>
            <img
              src={happyPickle}
              alt="happy pickle"
              className={classes.image}
            />
          </div>
        );
      case 'under':
        return <Typography variant="h3">Ikke værst!</Typography>;
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

  function onClickSave() {
    if (!saved) {
      axiosInstance()
        .post('/saved/', { sets: id })
        .then(() => {
          getContent();
        })
        .catch((e) => {
          return e;
        });
    } else if (saved) {
      axiosInstanceDelete()
        .delete(`/saved/${id}`)
        .then(() => {
          getContent();
        })
        .catch((e) => {
          return e;
        });
    }
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
        <IconButton
          className={saved ? classes.saved : classes.notSaved}
          onClick={() => onClickSave()}
        >
          {saved ? (
            <FavoriteIcon style={{ color: 'red' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default FinishedSet;
