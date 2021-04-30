import React, { useState, useEffect } from 'react';
import {
  Button,
  Fab,
  Paper,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
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
  chat1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  question1: yup.string().required('Dette feltet må fylles ut.').max(1000),
  answer1: yup.string().required('Dette feltet må fylles ut.'),
  explanation1: yup.string().required('Dette feltet må fylles ut.').max(1000),
});

// TODO
const CreateForstaelse = ({
  onGoBack,
  formDataEdit,
  onSubmitPost,
  onSubmitPut,
}) => {
  const classes = useStyles();
  const [taskAmount, setTaskAmount] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // TODO
  useEffect(() => {
    if (formDataEdit) {
      if (formDataEdit.chat3) {
        setTaskAmount(3);
      } else if (formDataEdit.chat2) {
        setTaskAmount(2);
      }
    }
  }, []);

  /**
   * Used to avoid repetition of same code because there are many similar fields.
   * @param {string} name The name of the field.
   * @param {boolean} touched Formik prop. Validation will only run if field has been touched by user.
   * @param {boolean} errors Formik prop to handle errors on user input.
   * @returns The complete field that will be shown to the user.
   */

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
      <div className={classes.headergroup}>
        <Typography variant="h1">Forståelse</Typography>
        <IconButton
          data-testid="infoButton"
          onClick={() => setShowModal('createforstaelse')}
        >
          <InfoIcon className={classes.icons} />
        </IconButton>
      </div>
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
                    <Typography variant="h2" paragraph>
                      Tema
                      {` ${el + 1} `}
                    </Typography>
                    <Grid item xs={12}>
                      <Typography component="p">
                        Du skal sende en melding til en venn. Skriv meldingen
                        her: *
                      </Typography>
                      {formTextField(`chat${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p">
                        Skriv et ja/nei spørsmål med tanke på meldingen: *
                      </Typography>
                      {formTextField(`question${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        Velg om svaret på spørsmålet over er ja eller nei
                      </Typography>
                      {formSelectField(`answer${el + 1}`, touched, errors)}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component="p">
                        Forklar hvorfor svaret er ja/nei: *
                      </Typography>
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
                  color="secondary"
                  size="small"
                  onClick={() => {
                    setFieldValue(`chat${taskAmount}`, '', false);
                    setFieldValue(`question${taskAmount}`, '', false);
                    setFieldValue(`explanation${taskAmount}`, '', false);
                    setTaskAmount(taskAmount - 1);
                  }}
                  variant="contained"
                  data-testid="removeButton"
                >
                  <RemoveIcon />
                </Fab>
              )}
              {taskAmount < 3 && (
                <Fab
                  className={classes.innerMargin}
                  size="small"
                  color="secondary"
                  onClick={() => setTaskAmount(taskAmount + 1)}
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
export default CreateForstaelse;
