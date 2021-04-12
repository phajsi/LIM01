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
}) => {
  const [exerciseFeedback] = useState([]);
  const [formDataComment, setFormDataComment] = useState({ sets: id });
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [ratings, setRatings] = useState({ upvote: 0, downvote: 0 });

  const classes = useStyles();

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

  function onsubmitPostComment() {
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
