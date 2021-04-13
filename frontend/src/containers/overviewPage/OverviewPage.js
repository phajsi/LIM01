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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { connect } from 'react-redux';
import {
  axiosInstanceGet,
  axiosInstance,
  axiosInstanceDelete,
} from '../../helpers/ApiFunctions';
import useStyles from './style';

const OverviewPage = ({
  title,
  description,
  id,
  nextExercise,
  isAuthenticated,
  user,
  completed,
}) => {
  // object which contains all the comments related to an exercise set with a specific ID
  const [exerciseFeedback] = useState([]);
  // object which contains a set ID, comment and username for creating a new comment
  const [formDataComment, setFormDataComment] = useState({ sets: id });
  // bool used to check whether a user has clicked on a comment to delete it
  const [open, setOpen] = useState(false);
  // stores the ID of a comment the user is attempting to delete
  const [deleteId, setDeleteId] = useState(null);
  const [ratings, setRatings] = useState({ upvote: 0, downvote: 0 });

  const classes = useStyles();

  /**
   * this function updates exerciseFeedback when a user enters
   * the overviewpage of an exercise set with a given ID.
   * only comments related to that set ID are added to exerciseFeedback.
   * @param {*} feedbacks an object containing comments from backend as input.
   */
  function createFeedbackList(feedbacks) {
    Object.entries(feedbacks).forEach(([comment]) => {
      exerciseFeedback.push(feedbacks[comment]);
    });
  }

  function getContent() {
    const requestOne = axiosInstanceGet().get(`/comment/${id}`);
    const requestTwo = axiosInstanceGet().get(`/getrating/${id}`);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...res) => {
          createFeedbackList(res[0].data);
          setRatings(res[1].data);
        })
      )
      .catch((e) => {
        return e;
      });
  }

  // post request to the backend for the comment being created.
  function onsubmitPostComment() {
    // this line adds the name of the user creating the comment to formDataComment
    formDataComment.name = user.name;
    axiosInstance()
      .post(`/usercomment/`, formDataComment)
      .then(() => {
        exerciseFeedback.length = 0;
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  /**
   * this function deletes a comment with a specific ID from backend.
   * setOpen is set to false so the delete dialog is closed
   * length of exerciseFeedback is set to 0 to empty the variable before
   * requesting the object list of updated comments from backend.
   * @param {*} id ID of a specific comment as input.
   */
  function onDelete(id) {
    axiosInstanceDelete()
      .delete(`/usercomment/${id}`)
      .then(() => {
        setOpen(false);
        exerciseFeedback.length = 0;
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  // post request to the backend for saving an exercise set with a specific ID.
  function saveExercise() {
    axiosInstance()
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

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.infobox}>
          <h1>{title}</h1>
          <p>{description}</p>
          {completed && <p>Du har fullført dette settet</p>}
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
              <p>{user ? user.name : 'Test'}</p>
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
                    setFormDataComment({
                      ...formDataComment,
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
          {exerciseFeedback.map((comment) => {
            return (
              <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {comment.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {comment.comment}
                  </Typography>
                  {user && comment.name === user.name.toString() && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        setDeleteId(comment.id);
                        setOpen(true);
                      }}
                    >
                      Slett
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Bekreft Sletting</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Er du sikker på at du vil slette kommentaren? Det vil bli borte
              for alltid.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Avbryt
            </Button>
            <Button
              onClick={() => onDelete(deleteId)}
              color="primary"
              autoFocus
            >
              Slett
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(OverviewPage);
