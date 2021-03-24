import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button, Grid, Paper, Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from '../CreateForstaelse/styles';
import { axiosInstance } from '../../helpers/ApiFunctions';

const validationSchema = yup.object({
  chatquestion1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer11: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer12: yup.string().required('Dette feltet må fylles ut.').max(1000),
  correctanswer1: yup.string().required('Dette feltet må fylles ut.').max(1000),
});

const CreateChat = ({
  setStep,
  updateFormData,
  editId,
  formDataEdit,
  setEditId,
}) => {
  const classes = useStyles();
  const [taskAmount, setTaskAmount] = useState(1);

  const onSubmitPost = (values) => {
    axiosInstance
      .post('/createchat/', values)
      .then((response) => {
        setStep('Menu');
        updateFormData(response.data.id, 2);
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

  const onSubmitPut = (values) => {
    axiosInstance
      .put(`/createchat/${editId}`, values)
      .then((response) => {
        setEditId(null);
        setStep('Menu');
        return response;
      })
      .catch((e) => {
        return e;
      });
  };

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

  return (
    <Paper className={classes.root}>
      <h1>Chat</h1>
      <Formik
        initialValues={
          editId !== null
            ? formDataEdit
            : {
                chatquestion1: '',
                answer11: '',
                answer12: '',
                correctanswer1: '',
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
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className={classes.form}>
            <h2> Tema 1 </h2>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <p>Skriv spørsmålet her: </p>
                {formTextField(
                  'chatquestion1',
                  touched.chatquestion1,
                  errors.chatquestion1
                )}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                {formTextField('answer11', touched.answer11, errors.answer11)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                {formTextField('answer12', touched.answer12, errors.answer12)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
                {formTextField(
                  'correctanswer1',
                  touched.correctanswer1,
                  errors.correctanswer1
                )}
              </Grid>
            </Grid>
            {taskAmount > 1 && (
              <>
                <hr />
                <h2> Tema 2 </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p>Skriv spørsmålet her: </p>
                    {formTextField(
                      'chatquestion2',
                      touched.chatquestion2,
                      errors.chatquestion2
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                    {formTextField(
                      'answer21',
                      touched.answer21,
                      errors.answer21
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                    {formTextField(
                      'answer22',
                      touched.answer22,
                      errors.answer22
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
                    {formTextField(
                      'correctanswer2',
                      touched.correctanswer2,
                      errors.correctanswer2
                    )}
                  </Grid>
                </Grid>
              </>
            )}
            {taskAmount > 2 && (
              <>
                <hr />
                <h2> Tema 3 </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p>Skriv spørsmålet her: </p>
                    {formTextField(
                      'chatquestion3',
                      touched.chatquestion3,
                      errors.chatquestion3
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                    {formTextField(
                      'answer31',
                      touched.answer31,
                      errors.answer31
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                    {formTextField(
                      'answer32',
                      touched.answer32,
                      errors.answer32
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
                    {formTextField(
                      'correctanswer3',
                      touched.correctanswer3,
                      errors.correctanswer3
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
                      setFieldValue('chatquestion3', '', false);
                      setFieldValue('answer31', '', false);
                      setFieldValue('answer32', '', false);
                      setFieldValue('correctanswer3', '', false);
                    } else {
                      setFieldValue('chatquestion2', '', false);
                      setFieldValue('answer21', '', false);
                      setFieldValue('answer22', '', false);
                      setFieldValue('correctanswer2', '', false);
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

export default CreateChat;
