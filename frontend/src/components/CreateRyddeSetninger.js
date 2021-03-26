import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from './CreateForstaelse/styles';

const validationSchema = yup.object({
  word1: yup.string().required('Dette feltet må fylles ut.').max(30),
  wordClass1: yup.string().required('Dette feltet må fylles ut.'),
  word2: yup.string().required('Dette feltet må fylles ut.').max(30),
  wordClass2: yup.string().required('Dette feltet må fylles ut.'),
  word3: yup.string().required('Dette feltet må fylles ut.').max(30),
  wordClass3: yup.string().required('Dette feltet må fylles ut.'),
});

const CreateRyddeSetninger = ({
  onGoBack,
  formDataEdit,
  onSubmitPost,
  onSubmitPut,
}) => {
  const classes = useStyles();

  /**
   * Used to avoid repetition of same code.
   * All fields in the form will use this function
   * @param {*} name the name of the field.
   * @param {*} label name/description that will be visibile to the user
   * @param {*} touched Formik prop. validation will only run if field has been touched by user
   * @param {*} errors Formik prop to handle errors on user input.
   * @returns The complete field that will be shown to the user
   */
  function formTextField(name, label, touched, errors) {
    return (
      <Field
        name={name}
        label={label}
        margin="dense"
        fullWidth
        variant="outlined"
        as={TextField}
        error={touched[name] && errors[name]}
        helperText={touched[name] && errors[name]}
      />
    );
  }

  function formSelectField(name, touched, errors) {
    return (
      <Field
        className={classes.field}
        name={name}
        margin="dense"
        fullWidth
        as={Select}
        error={touched[name] && errors[name]}
        helperText={touched[name] && errors[name]}
      >
        <MenuItem value="n">Substantiv</MenuItem>
        <MenuItem value="v">Verb</MenuItem>
        <MenuItem value="adj">Adjektiv</MenuItem>
        <MenuItem value="adv">Adverb</MenuItem>
        <MenuItem value="prp">Preposisjon</MenuItem>
        <MenuItem value="conj">Konjuksjon</MenuItem>
        <MenuItem value="subj">Subjuksjon</MenuItem>
        <MenuItem value="det">Determinativ</MenuItem>
        <MenuItem value="pron">Pronomen</MenuItem>
        <MenuItem value="intj">Interjeksjon</MenuItem>
      </Field>
    );
  }

  return (
    <Paper className={classes.root}>
      <h1>Rydde Setninger</h1>
      <Formik
        initialValues={
          formDataEdit || {
            word1: '',
            wordClass1: '',
            word2: '',
            wordClass2: '',
            word3: '',
            wordClass3: '',
          }
        }
        onSubmit={(values) => {
          if (!formDataEdit) {
            onSubmitPost(values, '/create_rydde_setninger/');
          } else {
            onSubmitPut(values, `/create_rydde_setninger/${formDataEdit.id}`);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <h3>Skriv inn ord i rekkefølge for å lage en setning:</h3>
              </Grid>
              <Grid item xs={6}>
                <h3>Velg tilhørende ordklasse:</h3>
              </Grid>
              <Grid item xs={6}>
                {formTextField('word1', 'ord 1', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass1', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word2', 'ord 2', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass2', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word3', 'ord 3', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass3', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word4', 'ord 4', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass4', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word5', 'ord 5', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass5', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word6', 'ord 6', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass6', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word7', 'ord 7', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass7', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word8', 'ord 8', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass8', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word9', 'ord 9', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass9', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word10', 'ord 10', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField('wordClass10', touched, errors)}
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Opprett
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
          onGoBack();
        }}
      >
        Tilbake
      </Button>
    </Paper>
  );
};

export default CreateRyddeSetninger;
