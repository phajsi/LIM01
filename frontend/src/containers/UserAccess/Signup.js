import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { signup } from '../../actions/auth';
import useStyles from './styles';

const Signup = ({ signup, isAuthenticated }) => {
  const classes = useStyles();
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.infoBox}>
        <h1 className={classes.headline}>Opprett bruker</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            type="text"
            placeholder="Navn*"
            name="name"
            variant="outlined"
            margin="dense"
            value={name}
            onChange={(e) => onChange(e)}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="email"
            placeholder="Epost"
            name="email"
            variant="outlined"
            margin="dense"
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
            type="password"
            placeholder="Passord*"
            name="password"
            variant="outlined"
            margin="dense"
            value={password}
            onChange={(e) => onChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            minLength="6"
            fullWidth
            required
          />
          <TextField
            type="password"
            placeholder="Bekreft Passord*"
            name="re_password"
            variant="outlined"
            margin="dense"
            value={re_password}
            onChange={(e) => onChange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            minLength="6"
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            className={classes.button}
          >
            Opprett
          </Button>
        </form>
        <hr className={classes.divider} />
        <Grid container>
          <Grid item xs={6}>
            <p> Har du en konto? </p>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/Login"
              variant="contained"
              fullWidth
              size="small"
              className={classes.secondaryButton}
            >
              Logg inn
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

export default connect(mapStateToProps, { signup })(Signup);
