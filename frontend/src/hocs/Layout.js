import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthenticated, load_user } from '../actions/auth';
import Navbar from '../components/Navbar/Navbar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
