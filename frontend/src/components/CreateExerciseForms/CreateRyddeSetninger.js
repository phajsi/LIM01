/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Grid,
  Fab,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoModal from '../InfoModal/InfoModal';
import useStyles from './styles';

const validationSchema = yup.object({
  word1: yup.string().required('Dette feltet må fylles ut.').max(20),
  word2: yup.string().required('Dette feltet må fylles ut.').max(20),
  word3: yup.string().required('Dette feltet må fylles ut.').max(20),
});

const CreateRyddeSetninger = ({
  onGoBack,
  formDataEdit,
  onSubmitPost,
  onSubmitPut,
}) => {
  const classes = useStyles();

  const [words, addWords] = useState(3);
  const [showModal, setShowModal] = useState(false);

  /**
   * Used to avoid repetition of same code.
   * All fields in the form will use this function
   * @param {String} name the name of the field.
   * @param {String} label name/description that will be visibile to the user
   * @param {Boolean} touched Formik prop. validation will only run if field has been touched by user
   * @param {Boolean} errors Formik prop to handle errors on user input.
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
  useEffect(() => {
    if (formDataEdit) {
      let wordAmount = 0;
      Object.entries(formDataEdit).forEach(([key, values]) => {
        if (!key.includes('Class') && key !== 'id' && values !== '') {
          wordAmount += 1;
        }
      });
      addWords(wordAmount);
    }
  }, []);

  return (
    <Paper className={classes.root}>
      <Grid className={classes.headergroup}>
        <h1>Rydde Setninger</h1>
        <IconButton onClick={() => setShowModal('rydde_setninger')}>
          <InfoIcon className={classes.icons} />
        </IconButton>
      </Grid>
      <Formik
        initialValues={
          formDataEdit || {
            word1: '',
            word2: '',
            word3: '',
          }
        }
        onSubmit={(values) => {
          if (!formDataEdit) {
            onSubmitPost(values, '/create_rydde_setninger/', 'ryddeSetninger');
          } else {
            onSubmitPut(values, `/create_rydde_setninger/${formDataEdit.id}`);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <h3>Skriv inn ord i rekkefølge for å lage en setning: *</h3>
              </Grid>
              <Grid item xs={6}>
                <h3>Velg ordklassen ordet tilhører:</h3>
              </Grid>
              {words > 0 &&
                [...Array(words).keys()].map((el) => {
                  return (
                    <>
                      <Grid item xs={6}>
                        {formTextField(
                          `word${el + 1}`,
                          `ord ${el + 1}`,
                          touched,
                          errors
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        {formSelectField(`wordClass${el + 1}`, touched, errors)}
                      </Grid>
                    </>
                  );
                })}
            </Grid>
            <Grid />
            <div className={classes.addIcon}>
              {words > 3 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  onClick={() => {
                    setFieldValue(`word${words}`, '', false);
                    setFieldValue(`wordClass${words}`, '', false);
                    addWords(words - 1);
                  }}
                  variant="contained"
                >
                  <RemoveIcon />
                </Fab>
              )}
              {words < 10 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  onClick={() => addWords(words + 1)}
                  variant="contained"
                >
                  <AddIcon />
                </Fab>
              )}
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  onGoBack();
                }}
              >
                Tilbake
              </Button>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Opprett
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      {showModal && (
        <InfoModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </Paper>
  );
};

export default CreateRyddeSetninger;
