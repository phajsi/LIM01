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
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import gingerMan from '../../assets/images/gingerMan.png';
import capsMan from '../../assets/images/capsMan.png';
import frenchMan from '../../assets/images/frenchMan.png';
import brunetteWoman from '../../assets/images/brunetteWoman.png';
import blondeWoman from '../../assets/images/blondeWoman.png';
import muslimWoman from '../../assets/images/muslimWoman.png';
import InfoModal from '../InfoModal/InfoModal';
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
  const [showModal, setShowModal] = useState(false);

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
      <Grid className={classes.headergroup}>
        <h1>Chat</h1>
        <IconButton onClick={() => setShowModal('chat')}>
          <InfoIcon className={classes.icons} />
        </IconButton>
      </Grid>
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
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <p>Skriv en melding i form av et spørsmål her: *</p>
                      <Grid item xs={11}>
                        {formTextField(
                          `chatquestion${el + 1}`,
                          touched,
                          errors
                        )}
                      </Grid>
                      <p>Skriv et FEIL svaralternativ til meldingen her: *</p>
                      <Grid item xs={11}>
                        {formTextField(`answer${el + 1}1`, touched, errors)}
                      </Grid>
                      <Grid>
                        <ClearIcon />
                      </Grid>
                      <p>Skriv et FEIL svaralternativ til meldingen her: *</p>
                      <Grid item xs={11}>
                        {formTextField(`answer${el + 1}2`, touched, errors)}
                      </Grid>
                      <Grid>
                        <ClearIcon />
                      </Grid>
                      <p>Skriv det RIKTIGE svaret til meldingen her: *</p>
                      <Grid item xs={11}>
                        {formTextField(
                          `correctanswer${el + 1}`,
                          touched,
                          errors
                        )}
                      </Grid>
                      <Grid>
                        <CheckIcon />
                      </Grid>
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
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
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

export default CreateChat;
