import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Toolbar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import logo from '../../assets/images/logoWithText.png';
import useStyles from './styles';

const Navbar = ({ logout, isAuthenticated, user }) => {
  const classes = useStyles();

  const [redirect, setRedirect] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutUser = () => {
    logout();
    setRedirect(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const guestLinks = () => (
    <>
      <Hidden xsDown implementation="css">
        <Typography variant="h6" className={classes.right}>
          <Link to="/login" className={classes.title}>
            Logg inn
          </Link>
          <Link to="/signup" className={classes.title}>
            Registrering
          </Link>
        </Typography>
      </Hidden>

      <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle}>
        <div className={classes.toolbar} />
        <List component="nav" className={classes.list}>
          <ListItem button component={Link} to="/login">
            <ListItemText className={classes.listItem}>Logg inn</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/signup">
            <ListItemText className={classes.listItem}>
              Registrering
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );

  const authLinks = () => (
    <>
      <Hidden xsDown implementation="css">
        <div className={classes.loginContainer}>
          <Typography variant="h6" className={classes.right}>
            <Link to="/createexercise" className={classes.title}>
              Opprett oppgavesett
            </Link>
          </Typography>
          <div className={classes.container}>
            <Typography variant="h6" className={classes.userName}>
              Hei,
              {user && ` ${user.name}! `}
            </Typography>
            <Typography variant="h6" href="#!" onClick={logoutUser}>
              <Link to="/" className={classes.title}>
                Logg ut
              </Link>
            </Typography>
          </div>
        </div>
      </Hidden>
      <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle}>
        <div className={classes.toolbar} />
        <List component="nav" className={classes.list}>
          <ListItem button component={Link} to="/createexercise">
            <ListItemText className={classes.listItem}>
              Opprett oppgavesett
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/" onClick={logoutUser}>
            <ListItemText className={classes.listItem}>Logg ut</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appbar}>
        <Toolbar
          style={{
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, #53A77A 1.46%, #80D197 100%)',
          }}
        >
          <Button
            component={Link}
            to={isAuthenticated ? '/home' : '/'}
            className={classes.img}
          >
            <img src={logo} alt="logo" />
          </Button>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
