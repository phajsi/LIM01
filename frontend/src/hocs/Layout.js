import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Navbar from '../components/Navbar/Navbar';
import useStyles from './styles';

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
