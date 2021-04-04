import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { axiosInstanceGet } from '../helpers/ApiFunctions';

const OverviewPage = ({ title, description, id }) => {
  const [exerciseFeedback] = useState([]);

  function createFeedbackList(feedbacks) {
    Object.entries(feedbacks).forEach(([comment]) => {
      if (feedbacks[comment].sets === Number(id)) {
        exerciseFeedback.push(feedbacks[comment]);
      }
    });
  }

  function getFeedback() {
    axiosInstanceGet
      .get(`/feedback/`)
      .then((response) => {
        createFeedbackList(response.data);
      })
      .catch((e) => {
        return e;
      });
  }

  useEffect(() => {
    getFeedback();
  }, []);

  console.log(exerciseFeedback);

  return (
    <Paper>
      <Grid>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </Grid>
      <Grid>
        <h2>Kommentarer...</h2>
      </Grid>
    </Paper>
  );
};

export default OverviewPage;
