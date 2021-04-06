import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button, Grid, Paper, Fab, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from './styles';

const validationSchema = yup.object({
  chatquestion1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer11: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer12: yup.string().required('Dette feltet må fylles ut.').max(1000),
  correctanswer1: yup.string().required('Dette feltet må fylles ut.').max(1000),
});

const CreateChat = ({ onGoBack, formDataEdit, onSubmitPost, onSubmitPut }) => {
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
        error={touched[name] && errors[name]}
        helperText={touched[name] && errors[name]}
      />
    );
  }

  return (
    <Paper className={classes.root}>
      <h1>Chat</h1>
      <Formik
        initialValues={
          formDataEdit || {
            chatquestion1: '',
            answer11: '',
            answer12: '',
            correctanswer1: '',
          }
        }
        onSubmit={(values) => {
          if (!formDataEdit) {
            onSubmitPost(values, '/createchat/', 'chat');
          } else {
            onSubmitPut(values, `/createchat/${formDataEdit.id}`);
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
                {formTextField('chatquestion1', touched, errors)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                {formTextField('answer11', touched, errors)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                {formTextField('answer12', touched, errors)}
              </Grid>
              <Grid item xs={12}>
                <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
                {formTextField('correctanswer1', touched, errors)}
              </Grid>
            </Grid>
            {taskAmount > 1 && (
              <>
                <hr />
                <h2> Tema 2 </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <p>Skriv spørsmålet her: </p>
                    {formTextField('chatquestion2', touched, errors)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                    {formTextField('answer21', touched, errors)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                    {formTextField('answer22', touched, errors)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
                    {formTextField('correctanswer2', touched, errors)}
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
                    {formTextField('chatquestion3', touched, errors)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                    {formTextField('answer31', touched, errors)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                    {formTextField('answer32', touched, errors)}
                  </Grid>
                  <Grid item xs={12}>
                    <p>Skriv svaralternativ 3 her (Korrekt alternativ) her: </p>
                    {formTextField('correctanswer3', touched, errors)}
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
          onGoBack();
        }}
      >
        Tilbake
      </Button>
    </Paper>
  );
};

export default CreateChat;
