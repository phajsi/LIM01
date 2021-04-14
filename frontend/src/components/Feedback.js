import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import happyPickle from '../assets/images/happyPickle.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: 'auto',
    float: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    maxWidth: 300,
    float: 'right',
  },
  text: {
    maxWidth: 700,
    float: 'center',
    display: 'inline-block',
  },
});

const Feedback = ({ totalScore, totalExercises, feedbackState }) => {
  const classes = useStyles();

  switch (feedbackState) {
    case true:
      return (
        <Paper elevation={0} className={classes.root}>
          <div>
            <img
              src={happyPickle}
              alt="happy pickle"
              className={classes.image}
            />
            <Typography variant="h2" className={classes.text}>
              Hurra, du klarte det!
            </Typography>
            <Typography variant="h4" className={classes.text}>
              Poengsummen din er
              {` ${totalScore} `}
              <br />
              Av totalt
              {` ${totalExercises} `}
              mulige!
            </Typography>
          </div>
        </Paper>
      );
    case false:
      return (
        <Paper elevation={0} className={classes.root}>
          <div>
            <Typography variant="h2" className={classes.text}>
              Bedre lykke neste gang!
            </Typography>
            <Typography variant="h4" className={classes.text}>
              Poengsummen din er
              {` ${totalScore} `}
              <br />
              Av totalt
              {` ${totalExercises} `}
              mulige!
            </Typography>
          </div>
        </Paper>
      );
    default:
      return (
        <Paper className={classes.root}>
          <div>
            <Typography variant="h4" className={classes.text}>
              <br />
              Poengsummen din er
              {` ${totalScore} `}
              <br />
              Av totalt
              {` ${totalExercises} `}
              mulige!
            </Typography>
          </div>
        </Paper>
      );
  }
};

export default Feedback;
