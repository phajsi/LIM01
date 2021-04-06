import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import img from '../assets/images/User2.png';
import { axiosInstanceGet } from '../helpers/ApiFunctions';

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: 'auto',
  },
  text: {
    textlign: 'center',
    maxWidth: 800,
    margin: 'auto',
  },
  commentfield: {
    backgroundColor: '#F5F5F5',
    maxWidth: 800,
    margin: 'auto',
  },
  card: {
    marginBottom: '5px',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    maxHeight: 60,
    alignSelf: 'flex-start',
  },
  form: {
    margin: 'auto',
  },
  formfields: {
    width: '100%',
    marginBottom: '10px',
    marginTop: '5px',
  },
});

const OverviewPage = ({ title, description, id }) => {
  const [exerciseFeedback] = useState([]);
  const [formDataSet, setFormDataSet] = useState({ sets: id });
  // eslint-disable-next-line no-unused-vars
  const [renderPage, setRenderPage] = useState(0);
  const classes = useStyles();
  console.log(id);

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
        setRenderPage((render) => render + 1);
      })
      .catch((e) => {
        return e;
      });
  }

  function onsubmitPostComment() {
    axiosInstanceGet
      .post('/feedback/', formDataSet)
      .then(() => {
        getFeedback();
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
    <Paper className={classes.root}>
      <Grid className={classes.text}>
        <h1>{title}</h1>
        <p>{description}</p>
      </Grid>
      <Grid className={classes.commentfield}>
        <h2>Kommentarer...</h2>
        <Grid className={classes.form}>
          <p>Legg igjen en kommentar!</p>
          <div>
            <TextField
              name="owner"
              rowsMax={1}
              required
              placeholder="Navn"
              variant="outlined"
              onChange={
                (e) =>
                  setFormDataSet({
                    ...formDataSet,
                    owner: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </div>
          <div>
            <TextField
              className={classes.formfields}
              name="comment"
              multiline="true"
              rows={5}
              required
              placeholder="Kommentar..."
              variant="outlined"
              onChange={
                (e) =>
                  setFormDataSet({
                    ...formDataSet,
                    comment: e.target.value,
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onsubmitPostComment()}
          >
            Send inn
          </Button>
        </Grid>
        <Grid>
          {exerciseFeedback.length === 0 && (
            <p>Det finnes ingen kommentarer for dette settet ennå</p>
          )}
          {Object.values(exerciseFeedback).map((el) => {
            return (
              <Card className={classes.card}>
                <Avatar
                  alt="placeholder_icon"
                  src={img}
                  className={classes.media}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {el.owner}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {el.comment}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OverviewPage;
