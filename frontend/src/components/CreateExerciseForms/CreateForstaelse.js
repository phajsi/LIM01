import React, { useState, useEffect } from 'react';
import {
  Button,
  Fab,
  Paper,
  Grid,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoModal from '../InfoModal/InfoModal';
import useStyles from './styles';

const validationSchema = yup.object({
  chat1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  question1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer1: yup.string().required('Dette feltet må fylles ut.'),
  explanation1: yup.string().required('Dette feltet må fylles ut.').max(1000),
});

const CreateForstaelse = ({
  onGoBack,
  formDataEdit,
  onSubmitPost,
  onSubmitPut,
}) => {
  const classes = useStyles();
  const [taskAmount, setTaskAmount] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (formDataEdit) {
      if (formDataEdit.chat3) {
        setTaskAmount(3);
      } else if (formDataEdit.chat2) {
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

  function formSelectField(name, label, touched, errors) {
    return (
      <Field
        className={classes.field}
        name={name}
        label={label}
        margin="normal"
        fullWidth
        as={Select}
        error={touched[name] && errors[name]}
        helperText={touched[name] && errors[name]}
      >
        <MenuItem value="true">Ja</MenuItem>
        <MenuItem value="false">Nei</MenuItem>
      </Field>
    );
  }

  return (
    <Paper className={classes.root}>
      <Grid className={classes.headergroup}>
        <h1>Forståelse</h1>
        <IconButton onClick={() => setShowModal('forstaelse')}>
          <InfoIcon className={classes.icons} />
        </IconButton>
      </Grid>
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
            onSubmitPost(values, '/createforstaelse/', 'forstaelse');
          } else {
            onSubmitPut(values, `/createforstaelse/${formDataEdit.id}`);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, touched, setFieldValue, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={3}>
              {[...Array(taskAmount).keys()].map((el) => {
                return (
                  <>
                    <h2>
                      Tema
                      {` ${el + 1} `}
                    </h2>
                    <Grid item xs={12}>
                      <p>
                        Du skal sende en melding til en venn. Skriv meldingen
                        her: *
                      </p>
                      {formTextField(`chat${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <p>Skriv et ja/nei spørsmål med tanke på meldingen: *</p>
                      {formTextField(`question${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <p>Velg om svaret på spørsmålet over er ja eller nei</p>
                      {formSelectField(`answer${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <p>Forklar hvorfor svaret er ja/nei: *</p>
                      {formTextField(`explanation${el + 1}`, touched, errors)}
                    </Grid>
                  </>
                );
              })}
            </Grid>
            <Grid />
            <div className={classes.addIcon}>
              {taskAmount > 1 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  onClick={() => {
                    setFieldValue(`chat${taskAmount}`, '', false);
                    setFieldValue(`question${taskAmount}`, '', false);
                    setFieldValue(`explanation${taskAmount}`, '', false);
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
export default CreateForstaelse;
