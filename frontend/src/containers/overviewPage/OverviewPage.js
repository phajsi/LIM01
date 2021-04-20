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
  IconButton,
  InputAdornment,
  Divider,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SendIcon from '@material-ui/icons/Send';
import {
  axiosInstanceGet,
  axiosInstance,
  axiosInstanceDelete,
} from '../../helpers/ApiFunctions';
import topTriangle from '../../assets/images/topTriangle.svg';
import bottomTriangle from '../../assets/images/bottomTriangle.svg';
import useStyles from './style';
import SaveIcon from '../../components/SaveIcon';
import DeleteModal from '../../components/DeleteModal';

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

  useEffect(() => {
    getContent();
  }, []);

  return (
    <Paper className={classes.root}>
      <img src={topTriangle} alt="topTriangle" className={classes.triangle1} />
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.infobox}>
          <div className={classes.header}>
            <h1 className={classes.headertitle}>{title}</h1>
            {isAuthenticated && <SaveIcon id={id} />}
          </div>
          <Divider className={classes.divider} />
          <Grid container>
            <Grid item sm={9} xs={12}>
              <p className={classes.description}>{description}</p>
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
        <Grid item xs={12}>
          {completed.completed && (
            <p className={classes.completedtext}>
              Din beste score på dette settet er
              {` ${completed.score}%.`}
              <br />
              Prøv å forbedre scoren din.
            </p>
          )}
          <Grid item xs={12} className={classes.commentheader}>
            <h3>Kommentarer</h3>
            <div className={classes.rating}>
              <p>
                <ThumbUpIcon />
                {ratings.upvotes}
                <ThumbDownIcon />
                {ratings.downvotes}
              </p>
            </div>
          </Grid>
          {isAuthenticated ? (
            <Grid item xs={12} className={classes.makecomment}>
              <TextField
                className={classes.formfields}
                name="comment"
                multiline="true"
                rows={1}
                value={formDataComment.comment}
                required
                placeholder="Skriv en kommentar..."
                variant="outlined"
                onChange={
                  (e) =>
                    setFormDataComment({
                      ...formDataComment,
                      comment: e.target.value,
                    })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => onsubmitPostComment()}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.defaulttext}>
              <p>
                Du må være innlogget for å kunne kunne legge igen en kommentar
                til dette settet.
              </p>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} className={classes.commentfield}>
          {exerciseFeedback.length === 0 && <></>}
          {exerciseFeedback.map((comment) => {
            return (
              <Card className={classes.card}>
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
    </Paper>
  );
};

export default OverviewPage;
