import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';
import { axiosInstance } from '../helpers/ApiFunctions';

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: 'auto',
  },
});

const FinishedSet = ({ totalScore, id }) => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(null);
  const [formDataSave, setFormDataSave] = useState(false);

  const classes = useStyles();

  function getContent() {
    const requestOne = axiosInstance.get(`/userrating/${id}`);
    const requestTwo = axiosInstance.get(`/usersaved/${id}`);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...res) => {
          setFormData(res[0].data);
          setFormDataSave(true);
        })
      )
      .catch((e) => {
        return e;
      });
  }

  useEffect(() => {
    getContent();
  }, []);

  function onClickRating(rating) {
    const formData = {
      rating,
      sets: id,
    };
    axiosInstance
      .post(`/rating/`, formData)
      .then(() => {
        getContent();
      })
      .catch((e) => {
        console.log(e.response.data);
        return e;
      });
  }

  function onClickSave() {
    axiosInstance
      .post('/saved/', { sets: id })
      .then(() => {
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  return (
    <Paper className={classes.root}>
      <div>
        <h1>Du har spilt ferdig settet</h1>
        <h1>
          Din totale poengsum er:
          {totalScore}
        </h1>
        <h3>Hvis du likte settet kan du gi det tommel opp</h3>
        <button
          disabled={formData && formData.rating === true}
          type="button"
          onClick={() => onClickRating(true)}
        >
          <ThumbUpIcon />
        </button>
        <button
          disabled={formData && formData.rating === false}
          type="button"
          onClick={() => onClickRating(false)}
        >
          <ThumbDownIcon />
        </button>
      </div>
      <button
        disabled={formDataSave}
        type="button"
        onClick={() => onClickSave()}
      >
        <FavoriteBorderIcon />
      </button>
    </Paper>
  );
};

export default FinishedSet;
