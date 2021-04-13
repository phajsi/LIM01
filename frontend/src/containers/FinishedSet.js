import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Grid } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { axiosInstance, axiosInstanceDelete } from '../helpers/ApiFunctions';

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: 'auto',
  },
});

const FinishedSet = ({ totalScore, id, totalExercises, completed }) => {
  const [rating, setRating] = useState({ rating: null });
  const [saved, setSaved] = useState(false);

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
    getContent();
    if (!completed.completed) {
      postCompleted();
    } else if (completed.completed && totalScore > completed.score) {
      putCompleted();
    }
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
    <Paper className={classes.root}>
      <h1>Du har spilt ferdig settet</h1>
      <h1>
        Din totale poengsum er:
        {`${totalScore} av ${totalExercises}`}
      </h1>
      <h3>Hvis du likte settet kan du gi det tommel opp</h3>
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
