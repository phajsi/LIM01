import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Card,
  CardHeader,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { signup, checkAuthenticated } from '../../actions/auth';
import useStyles from './styles';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const validationSchema = yup.object({
  name: yup.string().required('Navn er påkrevd.').max(40),
  email: yup
    .string()
    .email('Må være en gyldig e-post.')
    .required('E-post er påkrevd.'),
  password: yup
    .string()
    .required('Passord er påkrevd.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Passordet må inneholde: minimum 8 tegn, en stor og liten bokstav, og et tall.'
    ),
  re_password: yup
    .string()
    .required('bekreftelse av passord er påkrevd.')
    .oneOf([yup.ref('password'), null], 'Passordene må være like.'),
});

/**
 * Sign up page for the website.
 * @author Simen, Phajsi
 * @param {object} props
 * @property {function} signup redux action for registering a user.
 * @property {boolean} isAuthenticated redux state used to check if a user is auth.
 * @property {*} signUpSuccess redux state used to check if signup failed.
 * @property {function} checkAuthenticated redux action for checking if auth is valid
 * and updating isAuthenticated.
 * @returns container for registering a user.
 */

const Signup = ({
  signup,
  isAuthenticated,
  signUpSuccess,
  checkAuthenticated,
}) => {
  const classes = useStyles();
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });

  const onSubmit = (values) => {
    signup(values.name, values.email, values.password, values.re_password);
    setSignUp(true);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  function errorHandling() {
    if (signUpSuccess) {
      setSignUp(false);
    }
    if (signUpSuccess.email) {
      return <ErrorMessage message="Denne E-post addressen er ikke gyldig." />;
    }
    if (signUpSuccess.password) {
      return <ErrorMessage message="Passordet er ikke godt nok." />;
    }
    if (signUpSuccess === true) {
      return (
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            avatar={<CheckCircleOutlinedIcon className={classes.icon} />}
            title="Takk! Vi har sendt deg en e-post med en link som du må trykke på for å aktivere brukeren din. Når du har gjort det kan du logge deg inn."
          />
        </Card>
      );
    }
    if (signUpSuccess) {
      return <ErrorMessage message="Noe gikk galt! Prøv igjen senere" />;
    }
    return <></>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.infoBox}>
        <h2 className={classes.headline}>Opprett bruker</h2>
        <Formik
          initialValues={formData}
          onSubmit={(values) => {
            onSubmit(values);
            setFormData(values);
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="name"
                placeholder="Navn *"
                variant="outlined"
                margin="dense"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                as={TextField}
                error={touched.name && errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                type="email"
                name="email"
                placeholder="E-post *"
                margin="dense"
                variant="outlined"
                as={TextField}
                fullWidth
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                name="password"
                placeholder="Password *"
                margin="dense"
                fullWidth
                type="password"
                variant="outlined"
                as={TextField}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                name="re_password"
                placeholder="Bekreft passord *"
                margin="dense"
                fullWidth
                type="password"
                variant="outlined"
                as={TextField}
                error={touched.re_password && errors.re_password}
                helperText={touched.re_password && errors.re_password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                disabled={signUp}
                color="primary"
                type="submit"
                fullWidth
                className={classes.button}
              >
                Opprett
              </Button>
              {errorHandling()}
            </Form>
          )}
        </Formik>
        <hr className={classes.divider} />
        <Grid container alignItems="center" justify="center">
          <Grid item xs={6}>
            <Typography> Har du en konto? </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/Login"
              variant="outlined"
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
  signUpSuccess: state.auth.signUpSuccess,
});

export default connect(mapStateToProps, { signup, checkAuthenticated })(Signup);
