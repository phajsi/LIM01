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
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { axiosInstanceGet, axiosInstance } from '../../helpers/ApiFunctions';
import useStyles from './style';

const OverviewPage = ({
  title,
  description,
  id,
  nextExercise,
  isAuthenticated,
  user,
}) => {
  const [exerciseFeedback] = useState([]);
  const [username, setUsername] = useState();
  const [formDataSet, setFormDataSet] = useState({ sets: id, name: username });
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

  function checkAuthentication() {
    if (isAuthenticated === true) {
      setUsername(user.name);
    } else {
      setUsername('');
    }
  }

  useEffect(() => {
    checkAuthentication();
    getContent();
  }, []);

  console.log(username);
  // console.log(exerciseFeedback);

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
                name="name"
                rowsMax={1}
                disabled
                placeholder={username}
                variant="outlined"
              />
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
          <Grid item xs={12} className={classes.makecomment}>
            <h2>Kommentarer...</h2>
            <p>
              Du må være innlogget for å kunne kunne legge igen en kommentar til
              dette settet.
            </p>
          </Grid>
        )}
        <Grid item xs={12} className={classes.commentfield}>
          {exerciseFeedback.length === 0 && (
            <p>Det finnes ingen kommentarer for dette settet ennå</p>
          )}
          {exerciseFeedback.map((el) => {
            // console.log(el);
            return (
              <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {el.name}
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
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(OverviewPage);
