import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {
  AppBar,
  Button,
  IconButton,
  Typography,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import logo from '../../assets/images/logoWithText.png';
import useStyles from './styles';

const Navbar = ({ logout, isAuthenticated, user }) => {
  const [redirect, setRedirect] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          Opprett oppgavesett
        </Link>
      </Typography>
      <div className={classes.container}>
        <Typography
          variant="h6"
          className={classes.title}
          style={{ textAlign: 'end' }}
        >
          Hei,
          {user && ` ${user.name}! `}
        </Typography>
        <Typography variant="h6" href="#!" onClick={logoutUser}>
          <Link to="/" className={classes.title}>
            Logg ut
          </Link>
        </Typography>
      </div>
    </>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        className={classes.appbar}
        style={{
          background: 'linear-gradient(90deg, #53A77A 1.46%, #80D197 100%)',
        }}
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Button component={Link} to={isAuthenticated ? '/home' : '/'}>
            <img src={logo} alt="logo" />
          </Button>
          {isAuthenticated ? authLinks() : guestLinks()}
        </Toolbar>
      </AppBar>
      {redirect && <Redirect to="/" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
