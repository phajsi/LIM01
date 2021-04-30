import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { login, checkAuthenticated } from '../../actions/auth';
import useStyles from './styles';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

/**
 * Login page for the website.
 * @author Simen, Phajsi
 * @param {object} props
 * @property {function} login redux action for user auth.
 * @property {boolean} isAuthenticated redux state used to check if a user is auth.
 * @property {*} loginError redux state used to check if login failed.
 * @property {function} checkAuthenticated redux action for checking if auth is valid
 * and updating isAuthenticated.
 * @returns container for logging in a user.
 */

const Login = ({ login, isAuthenticated, loginError, checkAuthenticated }) => {
  const classes = useStyles();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Boolean so user can toggle password visibility in password field.
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  function errorHandling() {
    if (loginError === 401) {
      return <ErrorMessage message="Brukernavn eller passord er feil." />;
    }
    if (typeof loginError === 'number') {
      return <ErrorMessage message="Noe gikk galt! Prøv igjen senere." />;
    }
    return <></>;
  }

  /**
   * This page should not be accessible if the user is already authenticated.
   * location.state?.prevLocation is passed to login component if the user was redirected
   * to login from another protected container such as /home or /createexercise because the
   * user was not authenticated.
   * It is used to redirect the user back to the prev location after the user has logged in.
   */
  if (isAuthenticated) {
    return location.state?.prevLocation ? (
      <Redirect to={location.state?.prevLocation} />
    ) : (
      <Redirect to="/home" />
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.infoBox}>
        <Typography variant="h2" gutterBottom className={classes.headline}>
          Logg inn
        </Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            type="text"
            placeholder="Epost"
            name="email"
            variant="outlined"
            value={email}
            onChange={(e) => onChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            required
            fullWidth
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            placeholder="Passord"
            name="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => onChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <VisibilityIcon data-testid="visibilityButton" />
                    ) : (
                      <VisibilityOffIcon data-testid="visibilityOffButton" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            minLength="6"
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            data-testid="LoggInnButton"
            fullWidth
            className={classes.button}
          >
            Logg inn
          </Button>
          {errorHandling()}
        </form>
        <hr className={classes.divider} />
        <Grid container alignItems="center" justify="center">
          <Grid item xs={6}>
            <Typography> Har du ikke en konto? </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.button}
            >
              Registrering
            </Button>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography> Glemt passordet? </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/reset-password"
              variant="outlined"
              fullWidth
              size="small"
              className={classes.button}
            >
              Bytt passord
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError,
});

export default connect(mapStateToProps, { login, checkAuthenticated })(Login);
