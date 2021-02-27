import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {
  AppBar,
  Box,
  Typography,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
        Login
      </Link>
      <Link to="/signup" className={classes.title}>
        Signup
      </Link>
    </Typography>
  );

  const authLinks = () => (
    <Typography href="#!" onClick={logoutUser}>
      Logout
    </Typography>
  );

  return (
    <div className={classes.root}>
      <Box component={AppBar} boxShadow={3}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Link to="/" className={classes.title}>
              Home
            </Link>
          </Typography>
          {isAuthenticated ? authLinks() : guestLinks()}
        </Toolbar>
      </Box>
      {redirect ? <Redirect to="/" /> : <div> </div>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
