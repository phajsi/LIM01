import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Navbar from '../components/Navbar/Navbar';
import useStyles from './styles';

/**
 * Global Layout component that contains and displays the Navbar
 * component to all pages that need it. It also passes the user information
 * and user authentication objects from Redux to all children pages.
 * @author Phajsi, Simen
 * @param {object} props Redux object with functions that load user information and authentication checks.
 * @returns The Navbar component and the Redux user information and authentication object.
 */

const Layout = (props) => {
  const classes = useStyles();

  // Runs when the page first renders and gets the user information and checks if the user is logged in.
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
