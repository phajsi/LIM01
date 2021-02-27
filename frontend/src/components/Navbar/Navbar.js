import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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

  const guestLinks = () => (
    <Fragment>
      <Link to="/login" role="button">
        Login
      </Link>
      <Link to="/signup" role="button">
        Signup
      </Link>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <a href="#!" onClick={logoutUser}>
        Logout
      </a>
    </Fragment>
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
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
