/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthenticated, load_user } from '../actions/auth';
import Navbar from '../components/Navbar/Navbar';
// import { Paper } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(90deg, #53A77A 1.46%, #80D197 100%)',
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.checkAuthenticated();
    props.load_user();
  }, []);

  return (
    <div className={classes.root}>
      <Navbar />
      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
