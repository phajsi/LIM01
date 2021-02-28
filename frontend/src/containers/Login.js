import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#3f51b5',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  infoBox: {
    marginTop: theme.spacing(3),
    margin: 'auto',
    padding: theme.spacing(3),
    width: '60vh',
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  secondaryButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    backgroundColor: 'gray',
    color: 'white',
  },
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.infoBox}>
        <h1>Log In</h1>
        <p>Log inn på din konto</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.button}
          >
            Login
          </Button>
        </form>
        <Grid container>
          <Grid item xs={6}>
            <p> Har du ikke en konto? </p>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              fullWidth
              size="small"
              className={classes.secondaryButton}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <p> Glemt passwordet? </p>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/reset-password"
              variant="contained"
              fullWidth
              size="small"
              className={classes.secondaryButton}
            >
              Opprett passord
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
