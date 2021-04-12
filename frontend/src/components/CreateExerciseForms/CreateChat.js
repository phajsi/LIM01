import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Grid,
  Paper,
  Fab,
  TextField,
  MenuItem,
  Select,
  Avatar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import gingerMan from '../../assets/images/gingerMan.png';
import capsMan from '../../assets/images/capsMan.png';
import frenchMan from '../../assets/images/frenchMan.png';
import brunetteWoman from '../../assets/images/brunetteWoman.png';
import blondeWoman from '../../assets/images/blondeWoman.png';
import muslimWoman from '../../assets/images/muslimWoman.png';
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

  useEffect(() => {
    if (formDataEdit) {
      if (formDataEdit.chatquestion3) {
        setTaskAmount(3);
      } else if (formDataEdit.chatquestion2) {
        setTaskAmount(2);
      }
    }
  }, []);

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
        <MenuItem value="gingerMan">
          <Avatar alt="gingerMan" src={gingerMan} />
        </MenuItem>
        <MenuItem value="capsMan">
          <Avatar alt="capsMan" src={capsMan} />
        </MenuItem>
        <MenuItem value="frenchMan">
          <Avatar alt="frenchMan" src={frenchMan} />
        </MenuItem>
        <MenuItem value="brunetteWoman">
          <Avatar alt="brunetteWoman" src={brunetteWoman} />
        </MenuItem>
        <MenuItem value="blondeWoman">
          <Avatar alt="blondeWoman" src={blondeWoman} />
        </MenuItem>
        <MenuItem value="muslimWoman">
          <Avatar alt="muslimWoman" src={muslimWoman} />
        </MenuItem>
      </Field>
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
              <Grid item xs={6}>
                <p>Hvem sender meldingen? </p>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3}>
                {formSelectField('sendericon', touched, errors)}
              </Grid>
              <Grid item xs={6}>
                <p>Hvem mottar meldingen? </p>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3}>
                {formSelectField('receivericon', touched, errors)}
              </Grid>
              <Grid item xs={3} />
              {[...Array(taskAmount).keys()].map((el) => {
                return (
                  <>
                    <h2>
                      Tema
                      {el + 1}
                    </h2>
                    <Grid item xs={12}>
                      <p>Skriv spørsmålet her: </p>
                      {formTextField(`chatquestion${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <p>Skriv svaralternativ 1 her (Feil alternativ): </p>
                      {formTextField(`answer${el + 1}1`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <p>Skriv svaralternativ 2 her (Feil alternativ): </p>
                      {formTextField(`answer${el + 1}2`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <p>Skriv svaralternativ 3 her (Korrekt alternativ): </p>
                      {formTextField(`correctanswer${el + 1}`, touched, errors)}
                    </Grid>
                  </>
                );
              })}
            </Grid>
            <div className={classes.addIcon}>
              {taskAmount > 1 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  onClick={() => {
                    setFieldValue(`chatquestion${taskAmount}`, '', false);
                    setFieldValue(`answer${taskAmount}1`, '', false);
                    setFieldValue(`answer${taskAmount}2`, '', false);
                    setFieldValue(`correctanswer${taskAmount}`, '', false);
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
