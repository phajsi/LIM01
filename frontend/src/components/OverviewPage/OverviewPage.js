import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import topTriangle from '../../assets/images/topTriangle.svg';
import bottomTriangle from '../../assets/images/bottomTriangle.svg';
import useStyles from './style';
import SaveIcon from '../SaveIcon/SaveIcon';
import DeleteModal from '../DeleteModal';

/**
 * The overviewPage component is displayed when a user searches for an exercise set to play.
 * This component displays the set's title, description, commentfield, rating, and a like button
 * if the user is authenticated. The user can click to play the set from this page.
 * @author Maja, Simen
 * @param {object} props
 * @property {string} title the exercise set's title.
 * @property {string} description the exercise set's description.
 * @property {integer} id of the exercise set.
 * @property {function} nextExercise fires when play button is clicked. Starts the exercise set.
 * @property {boolean} isAuthenticated redux state used to check if a user is auth.
 * @property {object} user redux object used to get user information.
 * @property {boolean} completed is true if the user has played the exercise set before.
 * @returns a component displaying overview information to an exercise set.
 */
const OverviewPage = ({
  title,
  description,
  id,
  nextExercise,
  isAuthenticated,
  user,
  completed,
}) => {
  // Object which contains all the comments related to an exercise set with a specific ID.
  const [exerciseFeedback] = useState([]);
  // Object which contains a set ID, comment and username for creating a new comment.
  const [formDataComment, setFormDataComment] = useState({ sets: id });
  // Boolean used to check whether a user has clicked on a comment to delete it.
  const [open, setOpen] = useState(false);
  // Stores the ID of a comment the user is attempting to delete.
  const [deleteId, setDeleteId] = useState(null);
  const [ratings, setRatings] = useState({ upvote: 0, downvote: 0 });
  const [redirectHome, setRedirectHome] = useState(false);

  const classes = useStyles();

  /**
   * This function updates exerciseFeedback when a user enters
   * the overviewpage of an exercise set with a given ID.
   * Only comments related to the set ID are added to exerciseFeedback.
   * @param {object} feedbacks an object containing comments from backend as input.
   */
  function createFeedbackList(feedbacks) {
    Object.entries(feedbacks).forEach(([comment]) => {
      exerciseFeedback.push(feedbacks[comment]);
    });
  }

  function getContent() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/comment/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((res) => {
        createFeedbackList(res.data);
      })
      .catch((e) => {
        return e;
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/getrating/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      })
      .then((res) => {
        setRatings(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  // Post request to the backend for the comment being created.
  function onsubmitPostComment() {
    // This line adds the name of the user creating the comment to formDataComment.
    formDataComment.name = user.name;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/usercomment/`,
        formDataComment,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        }
      )
      .then(() => {
        exerciseFeedback.length = 0;
        getContent();
        setFormDataComment({
          ...formDataComment,
          comment: '',
        });
      })
      .catch((e) => {
        return e;
      });
  }

  /**
   * This function deletes a comment with a specific ID from backend.
   * Then setOpen is set to false so the delete dialog is closed.
   * Length of exerciseFeedback is set to 0 to empty the variable before
   * requesting the object list of updated comments from backend.
   * @param {number} id ID of a specific comment as input.
   */
  function onDelete(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/usercomment/${id}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          accept: 'application/json',
        },
      })
      .then(() => {
        setOpen(false);
        exerciseFeedback.length = 0;
        getContent();
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
      <img src={topTriangle} alt="topTriangle" className={classes.triangle1} />
      <IconButton
        data-testid="homeButton"
        className={classes.homeIconbutton}
        onClick={() => setRedirectHome(true)}
      >
        <ArrowBackIcon />
        <Typography variant="h3">Hjem</Typography>
      </IconButton>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.infobox}>
          <div className={classes.header}>
            <Typography variant="h1" className={classes.centertext}>
              {title}
            </Typography>
            {isAuthenticated && (
              <SaveIcon className={classes.iconbutton} id={id} />
            )}
          </div>
          <Divider className={classes.divider} />
          <Grid container>
            <Grid item sm={9} xs={12} className={classes.centertext}>
              <Typography className={classes.description}>
                {description}
              </Typography>
            </Grid>
            <Grid item sm={3} xs={12} className={classes.buttongrid}>
              <Button
                className={classes.buttons}
                variant="contained"
                color="primary"
                onClick={() => nextExercise()}
              >
                Spill
                <PlayArrowIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={classes.completedtext}>
            {completed.completed && (
              <Typography gutterBottom data-testid="score">
                Din beste score på dette settet er
                {` ${completed.score}%.`}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className={classes.commentheader}>
            <Typography variant="h3">Kommentarer</Typography>
            <div className={classes.rating}>
              <Typography>
                <ThumbUpIcon />
                {ratings.upvotes}
                <ThumbDownIcon />
                {ratings.downvotes}
              </Typography>
            </div>
          </Grid>
          {isAuthenticated ? (
            <Grid
              item
              xs={12}
              className={classes.makecomment}
              data-testid="makeComment"
            >
              <TextField
                className={classes.formfields}
                name="comment"
                multiline
                rows={1}
                value={formDataComment.comment}
                required
                placeholder="Skriv en kommentar..."
                variant="outlined"
                onChange={(e) =>
                  setFormDataComment({
                    ...formDataComment,
                    comment: e.target.value,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        data-testid="submitButton"
                        onClick={() => onsubmitPostComment()}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" className={classes.defaulttext}>
                Du må være innlogget for å kunne kunne legge igen en kommentar
                til dette settet.
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} className={classes.commentfield}>
          {exerciseFeedback.length === 0 && <></>}
          {exerciseFeedback.map((comment, index) => {
            return (
              <Card data-testid="card" className={classes.card} key={index}>
                <CardContent className={classes.cardcontent}>
                  <Grid container>
                    <Grid item xs={2} className={classes.cardauthor}>
                      <Typography variant="subtitle1">
                        {comment.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.textgrid}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.cardtext}
                      >
                        {comment.comment}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      {user && comment.name === user.name.toString() && (
                        <IconButton
                          data-testid="delete"
                          className={classes.iconbutton}
                          onClick={() => {
                            setDeleteId(comment.id);
                            setOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
        {open && (
          <DeleteModal
            onDelete={() => onDelete(deleteId)}
            open={open}
            setOpen={setOpen}
          />
        )}
      </Grid>
      <img
        src={bottomTriangle}
        alt="bottomTriangle"
        className={classes.triangle2}
      />
      {redirectHome && (
        <Redirect
          to={
            isAuthenticated
              ? {
                  pathname: '/home',
                }
              : { pathname: '/' }
          }
        />
      )}
    </Paper>
  );
};

export default OverviewPage;
