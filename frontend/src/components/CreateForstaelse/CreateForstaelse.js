import React, { useState } from 'react';
import { Button, Fab, Paper, Grid, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from './styles';

const validationSchema = yup.object({
  chat1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  question1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer1: yup.string().required('Dette feltet må fylles ut.'),
  explanation1: yup.string().required('Dette feltet må fylles ut.').max(1000),
});

const CreateForstaelse = ({
  setStep,
  formDataEdit,
  onSubmitPost,
  onSubmitPut,
}) => {
  const classes = useStyles();
  const [taskAmount, setTaskAmount] = useState(1);

  function formTextField(name, touched, errors) {
    return (
      <Field
        name={name}
        margin="dense"
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
          formDataEdit || {
            chat1: '',
            question1: '',
            answer1: 'true',
            explanation1: '',
          }
        }
        onSubmit={(values) => {
          if (!formDataEdit) {
            onSubmitPost(values, '/createforstaelse/');
          } else {
            onSubmitPut(values, `/createforstaelse/${formDataEdit.id}`);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className={classes.form}>
            <h2>Oppgave 1</h2>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p>Skriv chat meldingen her:</p>
                {formTextField('chat1', touched.chat1, errors.chat1)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv et ja/nei spørsmål til chat meldingen:</p>
                {formTextField(
                  'question1',
                  touched.question1,
                  errors.question1
                )}
              </Grid>
              <Grid item xs={12}>
                <p>Velg om svaret er ja eller nei</p>
                {formSelectField('answer1', touched.answer1, errors.answer1)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv en forklaring til riktig svar</p>
                {formTextField(
                  'explanation1',
                  touched.explanation1,
                  errors.explanation1
                )}
              </Grid>
            </Grid>
            {taskAmount > 1 && (
              <>
                <hr />
                <h2> Oppgave 2 </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p>Skriv chat meldingen her:</p>
                    {formTextField('chat2', touched.chat2, errors.chat2)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv et ja/nei spørsmål til chat meldingen:</p>
                    {formTextField(
                      'question2',
                      touched.question2,
                      errors.question2
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Velg om svaret er ja eller nei</p>
                    {formSelectField(
                      'answer2',
                      touched.answer2,
                      errors.answer2
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv en forklaring til riktig svar</p>
                    {formTextField(
                      'explanation2',
                      touched.explanation2,
                      errors.explanation2
                    )}
                  </Grid>
                </Grid>
              </>
            )}
            {taskAmount > 2 && (
              <>
                <hr />
                <h2> Oppgave 3 </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p>Skriv chat meldingen her:</p>
                    {formTextField('chat3', touched.chat3, errors.chat3)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv et ja/nei spørsmål til chat meldingen:</p>
                    {formTextField(
                      'question3',
                      touched.question3,
                      errors.question3
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Velg om svaret er ja eller nei</p>
                    {formSelectField(
                      'answer3',
                      touched.answer3,
                      errors.answer3
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv en forklaring til riktig svar</p>
                    {formTextField(
                      'explanation3',
                      touched.explanation3,
                      errors.explanation3
                    )}
                  </Grid>
                </Grid>
              </>
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
        }}
      >
        Tilbake
      </Button>
    </Paper>
  );
};
export default CreateForstaelse;
