import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { connect } from 'react-redux';
import img from '../../assets/images/defaultMan.png';
import { login } from '../../actions/auth';
import { axiosInstanceGet, axiosInstance } from '../../helpers/ApiFunctions';
import useStyles from './style';

const OverviewPage = ({
  title,
  description,
  id,
  nextExercise,
  isAuthenticated,
}) => {
  const [exerciseFeedback] = useState([]);
  const [formDataSet, setFormDataSet] = useState({ sets: id });
  // eslint-disable-next-line no-unused-vars
  const [renderPage, setRenderPage] = useState(0);
  const [ratings, setRatings] = useState({ upvote: 0, downvote: 0 });

  const classes = useStyles();

  function createFeedbackList(feedbacks) {
    Object.entries(feedbacks).forEach(([comment]) => {
      exerciseFeedback.push(feedbacks[comment]);
    });
  }

  function getContent() {
    const requestOne = axiosInstanceGet.get(`/comment/${id}`);
    const requestTwo = axiosInstanceGet.get(`/rating/${id}`);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...res) => {
          createFeedbackList(res[0].data);
          setRenderPage((render) => render + 1);
          setRatings(res[1].data);
        })
      )
      .catch((e) => {
        return e;
      });
  }

  function onsubmitPostComment() {
    axiosInstance
      .post(`/usercomment/`, formDataSet)
      .then(() => {
        exerciseFeedback.length = 0;
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  function saveExercise() {
    axiosInstance
      .post('/saved/', { sets: id })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        return e;
      });
  }

  useEffect(() => {
    getContent();
  }, []);

  console.log(typeof isAuthenticated);

  console.log(exerciseFeedback);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.infobox}>
          <h1>{title}</h1>
          <p>{description}</p>
          <div>
            <p>
              <ThumbUpIcon />
              {ratings.upvotes}
              <ThumbDownIcon />
              {ratings.downvotes}
            </p>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.buttons}>
          <Button variant="contained" onClick={() => saveExercise()} fullWidth>
            Lagre
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => nextExercise()}
            fullWidth
          >
            Spill
          </Button>
        </Grid>
        {isAuthenticated ? (
          <Grid item xs={12} className={classes.makecomment}>
            <h2>Legg igjen en kommentar!</h2>
            <Grid item xs={12} className={classes.form}>
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
            </Grid>
            <Grid>
              <Button variant="contained" onClick={() => onsubmitPostComment()}>
                Send inn
              </Button>
            </Grid>
          </Grid>
        ) : (
          'Du må logge inn for å kunne kunne legge til en kommentar'
        )}
        <Grid item xs={12} className={classes.commentfield}>
          {exerciseFeedback.length === 0 && (
            <p>Det finnes ingen kommentarer for dette settet ennå</p>
          )}
          {exerciseFeedback.map((el) => {
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(OverviewPage);
