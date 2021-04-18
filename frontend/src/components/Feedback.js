import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import sadPickle from '../assets/images/sadPickle.png';
import mariusPickle from '../assets/images/mariusPickle.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: 30,
    marginBottom: 10,
    padding: 30,
    backgroundColor: 'antiquewhite',
  },
  image: {
    maxWidth: 150,
    marginBottom: 10,
    float: 'right',
  },
  text: {
    maxWidth: 600,
    marginBottom: 10,
    float: 'center',
    display: 'inline-block',
  },
});

const Feedback = ({
  totalScore,
  totalExercises,
  feedbackState,
  nextExercise,
}) => {
  const classes = useStyles();

  switch (feedbackState) {
    case true:
      return (
        <Paper elevation={0} className={classes.root}>
          <div>
            <img
              src={mariusPickle}
              alt="Marius pickle"
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
            <Button
              variant="contained"
              color="secondary"
              onClick={() => nextExercise()}
              fullWidth
            >
              Spill neste øvelse
            </Button>
          </div>
        </Paper>
      );
    case false:
      return (
        <Paper elevation={0} className={classes.root}>
          <div>
            <img src={sadPickle} alt="sad pickle" className={classes.image} />
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
            <Button
              variant="contained"
              color="secondary"
              onClick={() => nextExercise()}
              fullWidth
            >
              Spill neste øvelse
            </Button>
          </div>
        </Paper>
      );
    default:
      return (
        <Paper className={classes.root}>
          <div>
            <Typography variant="h4" className={classes.text}>
              Noe gikk galt
            </Typography>
          </div>
        </Paper>
      );
  }
};

export default Feedback;
