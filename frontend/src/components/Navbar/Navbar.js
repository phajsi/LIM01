import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import useStyles from './styles';

const Navbar = ({ logout, isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false);

  const logoutUser = () => {
    logout();
    setRedirect(true);
  };

  const classes = useStyles();

  const guestLinks = () => (
    <Typography variant="h6" className={classes.right}>
      <Link to="/login" className={classes.title}>
        Logg inn
      </Link>
      <Link to="/signup" className={classes.title}>
        Registrering
      </Link>
    </Typography>
  );

  const authLinks = () => (
    <>
      <Typography variant="h6" className={classes.right}>
        <Link to="/createexercise" className={classes.title}>
          Opprett øvelse
        </Link>
      </Typography>
      <Typography
        variant="h6"
        className={classes.right}
        href="#!"
        onClick={logoutUser}
      >
        <Link to="/" className={classes.title}>
          Logg ut
        </Link>
      </Typography>
    </>
  );

  return (
    <div>
      <AppBar position="relative" className={classes.root}>
        <Toolbar>
          <Typography variant="h6">
            <Link
              to="/home"
              className={classes.title}
              style={{ color: '#143725' }}
            >
              Home
            </Link>
          </Typography>
          {isAuthenticated ? authLinks() : guestLinks()}
        </Toolbar>
      </AppBar>
      {redirect ? <Redirect to="/" /> : <div> </div>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
