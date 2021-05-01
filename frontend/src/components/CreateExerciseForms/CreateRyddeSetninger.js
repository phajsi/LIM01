import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Grid,
  Fab,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoModal from '../InfoModal/InfoModal';
import useStyles from './styles';

/*
 * Used to specify validations for the form.
 * It specifies which fields need validation and gives a specific error message.
 */
const validationSchema = yup.object({
  word1: yup.string().required('Dette feltet må fylles ut.').max(20),
  word2: yup.string().required('Dette feltet må fylles ut.').max(20),
  word3: yup.string().required('Dette feltet må fylles ut.').max(20),
});

/**
 * @author Julie, Simen, Phajsi
 * @param {object} props
 * @property {function} onGoBack Function that takes the user to the CreateExercises page.
 * @property {object} formDataEdit Object that gets a previously written exercise from the database.
 * @property {function} onSubmitPost Function that runs if the Chat is being edited.
 * @property {function} onSubmitPut Function that runs if the Chat is new.
 * @returns a CreateRyddeSetninger component based on if the exercise is new or being edited.
 */
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
   * Used to avoid repetition of same code because there are many similar fields.
   * @param {string} name The name of the field.
   * @param {string} label The name/description that will be visibile to the user.
   * @param {boolean} touched Formik prop. Validation will only run if field has been touched by user.
   * @param {boolean} errors Formik prop to handle errors on user input.
   * @returns The complete field that will be shown to the user.
   */
  function formTextField(name, label, touched, errors) {
    return (
      <Field
        name={name}
        label={label}
        margin="dense"
        fullWidth
        variant="outlined"
        data-testid={name}
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

  /**
   * Runs when the page first renders and checks if an existing exercise
   * should be edited. FormDataEdit is passed as props if it is an exisiting exercise.
   * If not, this function does nothing.
   */
  useEffect(() => {
    if (formDataEdit) {
      let wordAmount = 0;
      // Used to keep track of how many words the exercise has.
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
      <div className={classes.headergroup}>
        <Typography variant="h1">Rydde Setninger</Typography>
        <IconButton
          data-testid="infoButton"
          onClick={() => setShowModal('createrydde_setninger')}
        >
          <InfoIcon className={classes.icons} />
        </IconButton>
      </div>
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
                <Typography variant="h3">
                  Skriv inn ord i rekkefølge for å lage en setning: *
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3">
                  Velg ordklassen ordet tilhører:
                </Typography>
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
                  color="secondary"
                  onClick={() => {
                    setFieldValue(`word${words}`, '', false);
                    setFieldValue(`wordClass${words}`, '', false);
                    addWords(words - 1);
                  }}
                  variant="contained"
                  data-testid="removeButton"
                >
                  <RemoveIcon />
                </Fab>
              )}
              {words < 10 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  color="secondary"
                  onClick={() => addWords(words + 1)}
                  variant="contained"
                  data-testid="addButton"
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
