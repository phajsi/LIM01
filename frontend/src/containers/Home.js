import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import dame from '../assets/images/dame.png';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: '100vh',
    color: 'beige',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  buttonRight: {
    margin: theme.spacing(1),
    backgroundColor: 'gray',
    color: 'white',
  },
  buttonLeft: {
    margin: theme.spacing(1),
  },
  infoBox: {
    marginTop: theme.spacing(1),
    margin: 'auto',
    padding: theme.spacing(2),
    width: '50%',
  },
  imgBox: {
    display: 'flex',
    margin: 'auto',
    padding: theme.spacing(2),
    width: '50%',
  },
  img: {
    maxSize: '40vh',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <h1>Vi gjør språkopplæring gøy!</h1>
        <p>Med PICKLE kan du enkelt lage og spille interaktive språkoppgaver</p>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="secondary"
          className={classes.buttonLeft}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          color="default"
          className={classes.buttonRight}
        >
          Signup
        </Button>
      </div>
      <div className={classes.imgBox}>
        <img src={dame} alt="woman" className={classes.img} />
      </div>
    </div>
  );
};

export default Home;
