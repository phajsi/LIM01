import React from 'react';
import axios from 'axios';
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

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    Authorization: `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const validationSchema = yup.object({
  word1: yup.string().required('Dette feltet må fylles ut.').max(30),
  wordClass1: yup.string().required('Dette feltet må fylles ut.'),
  word2: yup.string().required('Dette feltet må fylles ut.').max(30),
  wordClass2: yup.string().required('Dette feltet må fylles ut.'),
  word3: yup.string().required('Dette feltet må fylles ut.').max(30),
  wordClass3: yup.string().required('Dette feltet må fylles ut.'),
});

const CreateRyddeSetninger = ({
  setStep,
  updateFormDataRyddeSetninger,
  editId,
  formDataEdit,
  setEditId,
}) => {
  const classes = useStyles();

  const onSubmitPost = (values) => {
    axiosInstance
      .post('/create_rydde_setninger/', values)
      .then((response) => {
        setStep('Menu');
        updateFormDataRyddeSetninger(response.data.id);
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  const onSubmitPut = (values) => {
    axiosInstance
      .put(`/create_rydde_setninger/${editId}`, values)
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
          editId !== null
            ? formDataEdit
            : {
                word1: '',
                wordClass1: '',
                word2: '',
                wordClass2: '',
                word3: '',
                wordClass3: '',
              }
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
        {({ errors, touched, isSubmitting }) => (
          <Form className={classes.form}>
            <h1>Forståelse</h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                {formTextField('word1', 'ord', touched.word1, errors.word1)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass1',
                  'ordklasse',
                  touched.wordClass1,
                  errors.wordClass1
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word2', 'ord', touched.word2, errors.word2)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass2',
                  'ordklasse',
                  touched.wordClass2,
                  errors.wordClass2
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word3', 'ord', touched.word3, errors.word3)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass3',
                  'ordklasse',
                  touched.wordClass3,
                  errors.wordClass1
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word4', 'ord', touched.word4, errors.word4)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass4',
                  'ordklasse',
                  touched.wordClass1,
                  errors.wordClass1
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word5', 'ord', touched.word5, errors.word5)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass5',
                  'ordklasse',
                  touched.wordClass5,
                  errors.wordClass5
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word6', 'ord', touched.word6, errors.word6)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass6',
                  'ordklasse',
                  touched.wordClass6,
                  errors.wordClass6
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word7', 'ord', touched.word7, errors.word7)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass7',
                  'ordklasse',
                  touched.wordClass7,
                  errors.wordClass7
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word8', 'ord', touched.word8, errors.word8)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass8',
                  'ordklasse',
                  touched.wordClass8,
                  errors.wordClass8
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word9', 'ord', touched.word9, errors.word9)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass9',
                  'ordklasse',
                  touched.wordClass9,
                  errors.wordClass9
                )}
              </Grid>
              <Grid item xs={6}>
                {formTextField('word10', 'ord', touched.word10, errors.word10)}
              </Grid>
              <Grid item xs={6}>
                {formSelectField(
                  'wordClass10',
                  'ordklasse',
                  touched.wordClass10,
                  errors.wordClass10
                )}
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
          setStep('Menu');
          setEditId(null);
        }}
      >
        Tilbake
      </Button>
    </Paper>
  );
};

export default CreateRyddeSetninger;
