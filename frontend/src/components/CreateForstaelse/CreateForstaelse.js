import React, { useState } from 'react';
import { Button, Fab, Paper, Grid, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from './styles';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    'accept': 'application/json',
  },
});

const validationSchema = yup.object({
  chat1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  question1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer1: yup.string().required('Dette feltet må fylles ut.'),
  explanation1: yup.string().required('Dette feltet må fylles ut.').max(1000),
});

const CreateForstaelse = ({
  setStep,
  updateFormDataForstaelse,
  editId,
  formDataEditForstaelse,
  setEditId,
}) => {
  const classes = useStyles();
  const [taskAmount, setTaskAmount] = useState(1);

  const onSubmitPost = (values) => {
    axiosInstance
      .post('/createforstaelse/', values)
      .then((response) => {
        setStep('Menu');
        updateFormDataForstaelse(response.data.id);
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  const onSubmitPut = (values) => {
    axiosInstance
      .put(`/createforstaelse/${editId}`, values)
      .then((response) => {
        setEditId(null);
        setStep('Menu');
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  function formTextField(name, label, touched, errors) {
    return (
      <Field
        name={name}
        label={label}
        margin="normal"
        fullWidth
        variant="outlined"
        as={TextField}
        error={touched && errors}
        helperText={touched && errors}
      />
    );
  }

  function formSelectField(name, label, touched, errors) {
    return (
      <Field
        className={classes.field}
        name={name}
        label={label}
        margin="normal"
        fullWidth
        as={Select}
        error={touched && errors}
        helperText={touched && errors}
      >
        <MenuItem value="true">Ja</MenuItem>
        <MenuItem value="false">Nei</MenuItem>
      </Field>
    );
  }

  return (
    <Paper className={classes.root}>
      <h1>Forståelse</h1>
      <Formik
        initialValues={
          editId !== null
            ? formDataEditForstaelse
            : { chat1: '', question1: '', answer1: 'true', explanation1: '' }
        }
        onSubmit={(values) => {
          if (editId === null) {
            onSubmitPost(values);
          } else {
            onSubmitPut(values);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className={classes.form}>
            <h1>Forståelse</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {formTextField(
                  'chat1',
                  'Chat melding',
                  touched.chat1,
                  errors.chat1
                )}
              </Grid>
              <Grid item xs={12}>
                {formTextField(
                  'question1',
                  'Spørsmål',
                  touched.question1,
                  errors.question1
                )}
              </Grid>
              <Grid item xs={12}>
                {formSelectField(
                  'answer1',
                  'Riktig Svar',
                  touched.answer1,
                  errors.answer1
                )}
              </Grid>
              <Grid item xs={12}>
                {formTextField(
                  'explanation1',
                  'Forklaring',
                  touched.explanation1,
                  errors.explanation1
                )}
              </Grid>
            </Grid>
            {taskAmount > 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  {formTextField(
                    'chat2',
                    'Chat melding',
                    touched.chat2,
                    errors.chat2
                  )}
                </Grid>
                <Grid item xs={12}>
                  {formTextField(
                    'question2',
                    'Spørsmål',
                    touched.question2,
                    errors.question2
                  )}
                </Grid>
                <Grid item xs={12}>
                  {formSelectField(
                    'answer2',
                    'Riktig Svar',
                    touched.answer2,
                    errors.answer2
                  )}
                </Grid>
                <Grid item xs={12}>
                  {formTextField(
                    'explanation2',
                    'Forklaring',
                    touched.explanation2,
                    errors.explanation2
                  )}
                </Grid>
              </Grid>
            )}
            {taskAmount > 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  {formTextField(
                    'chat3',
                    'Chat melding',
                    touched.chat3,
                    errors.chat3
                  )}
                </Grid>
                <Grid item xs={12}>
                  {formTextField(
                    'question3',
                    'Spørsmål',
                    touched.question3,
                    errors.question3
                  )}
                </Grid>
                <Grid item xs={12}>
                  {formSelectField(
                    'answer3',
                    'Riktig Svar',
                    touched.answer3,
                    errors.answer3
                  )}
                </Grid>
                <Grid item xs={12}>
                  {formTextField(
                    'explanation3',
                    'Forklaring',
                    touched.explanation3,
                    errors.explanation3
                  )}
                </Grid>
              </Grid>
            )}
            <Grid />
            <div className={classes.addIcon}>
              {taskAmount > 1 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  onClick={() => {
                    if (taskAmount === 3) {
                      setFieldValue('chat3', '', false);
                      setFieldValue('question3', '', false);
                      setFieldValue('explanation3', '', false);
                    } else {
                      setFieldValue('chat2', '', false);
                      setFieldValue('question2', '', false);
                      setFieldValue('explanation2', '', false);
                    }
                    setTaskAmount(taskAmount - 1);
                  }}
                  variant="contained"
                >
                  <RemoveIcon />
                </Fab>
              )}
              {taskAmount < 3 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  onClick={() => setTaskAmount(taskAmount + 1)}
                  variant="contained"
                >
                  <AddIcon />
                </Fab>
              )}
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Continue
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          setStep('Menu');
          setEditId(null);
        }}
      >
        Tilbake
      </Button>
    </Paper>
  );
};
export default CreateForstaelse;
