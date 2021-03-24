import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    color: 'black',
    background: 'linear-gradient(90deg, #53A77A 1.46%, #80D197 100%)',
    height: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  infoBox: {
    margin: 'auto',
    padding: theme.spacing(2),
    width: '50%',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.infoBox} />
    </div>
  );
};

export default Home;
