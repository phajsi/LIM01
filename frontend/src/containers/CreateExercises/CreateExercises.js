/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import {
  Chip,
  Paper,
  MenuList,
  MenuItem,
  Button,
  TextField,
  Grid,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CreateForstaelse from '../../components/CreateExerciseForms/CreateForstaelse';
import CreateChat from '../../components/CreateExerciseForms/CreateChat';
import CreateRyddeSetninger from '../../components/CreateExerciseForms/CreateRyddeSetninger';
import InfoModal from '../../components/InfoModal/InfoModal';
import ErrorMessage from '../../components/ErrorMessage';
import useStyles from './styles';
import { axiosInstance, axiosInstanceDelete } from '../../helpers/ApiFunctions';

const CreateExercises = () => {
  const classes = useStyles();
  const location = useLocation();

  const [step, setStep] = useState('Menu');
  const [emptySetError, setEmptySetError] = useState(null);
  const [emptyFormError, setEmptyFormError] = useState(null);
  // object which contains formData from the exercise the user wants to edit
  const [formDataEdit, setFormDataEdit] = useState(null);
  // object which contains all the IDs for the exercises added to the set.
  const [formDataSet, setFormDataSet] = useState({});
  const [forminput, setForminput] = useState({
    title: '',
    description: '',
  });
  // keeps track of count to make sure no more than 5 of each are added.
  const [exerciseCounts, setExerciseCounts] = useState({ c: 0, f: 0, r: 0 });
  const [redirectHome, setRedirectHome] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /**
   * This function updates the formData for the current exercise set being made.
   * It deletes all entries in the object before adding them back with the correct number
   * i.e. It makes sure that chat2 will always be added before chat3 if both are empty.
   * It also updates the exercise counts which keeps track of how many exercises are in the set
   * and that it is not possible to add more than 5.
   * @param {*} form the function formDataSet as input.
   */

  function updateSet(form) {
    const formData = form;
    const count = { c: 0, f: 0, r: 0 };
    Object.entries(formData).forEach(([type, id]) => {
      if (!id) {
        delete formData[type];
      } else if (type.substring(0, 4) === 'chat') {
        delete formData[type];
        formData[`chat${[count.c + 1]}`] = id;
        count.c += 1;
      } else if (type.substring(0, 4) === 'fors') {
        delete formData[type];
        formData[`forstaelse${[count.f + 1]}`] = id;
        count.f += 1;
      } else if (type.substring(0, 4) === 'rydd') {
        delete formData[type];
        formData[`ryddeSetninger${[count.r + 1]}`] = id;
        count.r += 1;
      }
    });
    setFormDataSet(formData);
    setExerciseCounts(count);
  }

  // updates formdata for the set if user wants to edit an already existing set
  useEffect(() => {
    // location.state?... is the state/props passed from the Redirect.
    if (location.state?.editSet) {
      updateSet(location.state?.formSets);
    }
  }, []);

  /**
   * regular post request to the backend for the exercises being created in the set.
   * @param {*} values formData object for the exercise being created
   * @param {*} url url to the correct exercise type backend.
   * @param {*} type either chat, forstaelse or ryddeSetnigner
   */
  const onSubmitPost = (values, url, type) => {
    axiosInstance()
      .post(url, values)
      .then((response) => {
        // this line is adding a row to the formDataSetObject. i.e formdataSet.chat3 = id
        formDataSet[`${type}${[exerciseCounts[type.substring(0, 1)] + 1]}`] =
          response.data.id;
        updateSet(formDataSet);
        setEmptySetError(null);
        setStep('Menu');
      })
      .catch((e) => {
        return e;
      });
  };

  // Same as function above, but is used when a user wants to edit an exising esercise in the set.
  const onSubmitPut = (values, url) => {
    axiosInstance()
      .put(url, values)
      .then(() => {
        setFormDataEdit(null);
        setStep('Menu');
      })
      .catch((e) => {
        return e;
      });
  };

  /**
   * Gets the exercise formData from backend and passes it into the correct exercise
   * component when a user wants to edit an exercise.
   * @param {*} id id for the exercise which will be edited
   * @param {*} exerciseType type of exercise to be edited
   */
  function editExercise(id, exerciseType) {
    axiosInstance()
      .get(`/${exerciseType}/${id}`)
      .then((res) => {
        setFormDataEdit(res.data);
        setStep(exerciseType);
      })
      .catch((e) => {
        return e;
      });
  }

  /**
   * Deletes an exercise in the current set.
   * If a user tries to delete the last exercise in an already existing set then an error is thrown.
   * @param {*} exercise name of exercise. i.e chat4.
   * @param {*} url url to the delete api endpoint.
   */
  function onDeleteExercise(exercise, url) {
    if (location.state?.editSet && Object.keys(formDataSet).length === 4) {
      setEmptySetError('Det må være igjen minst en oppgave i settet.');
    } else {
      axiosInstanceDelete()
        .delete(url)
        .then(() => {
          delete formDataSet[exercise];
          updateSet(formDataSet);
        })
        .catch((e) => {
          return e;
        });
    }
  }

  /**
   * after the user has finished adding/deleting/editing exerices in the set this function will be run
   * If a user is editing an existing set, a put request will be sent and if a new set is made a post request.
   */

  function onSubmitPostSet() {
    console.log(forminput.title);
    console.log(forminput.description);
    if (
      !formDataSet.chat1 &&
      !formDataSet.forstaelse1 &&
      !formDataSet.ryddeSetninger1
    ) {
      setEmptySetError(
        'Du må legge til minst en oppgave for å opprette et sett.'
      );
    } else if (!forminput.title || !forminput.description) {
      setEmptyFormError(
        'Du må legge inn et navn og en beskrivelse av settet ditt'
      );
    } else {
      const data = { ...formDataSet, ...forminput };
      axiosInstance()
        .post('/createsets/', data)
        .then(() => {
          setStep('confirmation');
        })
        .catch((e) => {
          return e;
        });
    }
  }

  function onSubmitPutSet() {
    if (!forminput.title || !forminput.description) {
      setEmptyFormError(
        'Du må legge inn et navn og en beskrivelse av settet ditt'
      );
    }
    const data = { ...formDataSet, ...forminput };
    axiosInstance()
      .put(`/createsets/${formDataSet.id}`, data)
      .then(() => {
        setStep('confirmation');
      })
      .catch((e) => {
        return e;
      });
  }

  // function to reset formdataedit if a user doesnt want to edit the exercise
  function onGoBack() {
    setFormDataEdit(null);
    setStep('Menu');
  }

  function handleFormChange(input) {
    setForminput({
      ...forminput,
      [input.target.name]: input.target.value,
    });
    setEmptyFormError(null);
  }

  switch (step) {
    case 'Menu':
      return (
        <Paper className={classes.root}>
          <h1>Nytt sett</h1>
          <Grid container className={classes.gridcontainer}>
            <Grid item xs={12} className={classes.form}>
              <p className={classes.formfieldname}>Tittel:</p>
              <TextField
                name="title"
                multiline
                fullWidth
                rowsMax={1}
                required
                variant="outlined"
                defaultValue={forminput.title || formDataSet.title}
                onChange={(e) => handleFormChange(e)}
              />
            </Grid>
            <Grid item xs={12} className={classes.form}>
              <p className={classes.formfieldname}>Beskrivelse:</p>
              <TextField
                name="description"
                multiline="true"
                fullWidth
                rows={3}
                rowsMax={10}
                required
                variant="outlined"
                defaultValue={forminput.description || formDataSet.description}
                onChange={(e) => handleFormChange(e)}
              />
            </Grid>
            <Grid item md={5} xs={12} className={classes.menu}>
              <h2>Legg til oppgavetyper</h2>
              <MenuList>
                <Grid className={classes.menugroup}>
                  <MenuItem
                    className={classes.menuitemchat}
                    disabled={exerciseCounts.c > 4}
                    onClick={() => setStep('chat')}
                  >
                    Chat
                  </MenuItem>
                  <IconButton onClick={() => setShowModal('chat')}>
                    <InfoIcon className={classes.infoicon} />
                  </IconButton>
                </Grid>
                <Grid className={classes.menugroup}>
                  <MenuItem
                    className={classes.menuitemfors}
                    disabled={exerciseCounts.f > 4}
                    onClick={() => setStep('forstaelse')}
                  >
                    Forståelse
                  </MenuItem>
                  <IconButton onClick={() => setShowModal('forstaelse')}>
                    <InfoIcon className={classes.infoicon} />
                  </IconButton>
                </Grid>
                <Grid className={classes.menugroup}>
                  <MenuItem
                    className={classes.menuitemrydd}
                    disabled={exerciseCounts.r > 4}
                    onClick={() => setStep('rydde_setninger')}
                  >
                    Rydde Setninger
                  </MenuItem>
                  <IconButton onClick={() => setShowModal('rydde_setninger')}>
                    <InfoIcon className={classes.infoicon} />
                  </IconButton>
                </Grid>
              </MenuList>
            </Grid>
            <Grid item md={7} xs={12} className={classes.menu}>
              <h4>Oppgaver:</h4>
              <Grid container>
                {Object.entries(formDataSet).map(([type, id]) => {
                  if (type.substring(0, 4) === 'chat') {
                    return (
                      <Grid item xs={6} className={classes.chipgrid}>
                        <Chip
                          className={classes.chatchip}
                          label="Chat"
                          onClick={() => editExercise(id, 'chat')}
                        />
                        <IconButton
                          className={classes.deletebutton}
                          onClick={() =>
                            onDeleteExercise(type, `/deletechat/${id}`)
                          }
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Grid>
                    );
                  }
                  if (type.substring(0, 4) === 'fors') {
                    return (
                      <Grid item xs={6} className={classes.chipgrid}>
                        <Chip
                          className={classes.forschip}
                          label="Forstaelse"
                          onClick={() => editExercise(id, 'forstaelse')}
                        />
                        <IconButton
                          className={classes.deletebutton}
                          onClick={() =>
                            onDeleteExercise(type, `/deleteforstaelse/${id}`)
                          }
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Grid>
                    );
                  }
                  if (type.substring(0, 4) === 'rydd') {
                    return (
                      <Grid item xs={6} className={classes.chipgrid}>
                        <Chip
                          className={classes.ryddchip}
                          label="Rydde Setninger"
                          onClick={() => editExercise(id, 'rydde_setninger')}
                        />
                        <IconButton
                          className={classes.deletebutton}
                          onClick={() =>
                            onDeleteExercise(
                              type,
                              `/delete_rydde_setninger/${id}`
                            )
                          }
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      </Grid>
                    );
                  }
                  return <></>;
                })}
              </Grid>
            </Grid>
            <Grid item sm={12} className={classes.errormessage}>
              <div>
                <ErrorMessage message={emptyFormError} />
                <ErrorMessage message={emptySetError} />
              </div>
            </Grid>
            <Grid item sm={12} className={classes.buttoncontainer}>
              <Grid>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  onClick={() => setRedirectHome(true)}
                >
                  Kanseller
                </Button>
              </Grid>
              <Grid>
                <Button
                  className={classes.buttons}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (location.state?.editSet) {
                      onSubmitPutSet();
                    } else {
                      onSubmitPostSet();
                    }
                  }}
                >
                  {location.state?.editSet ? 'Endre' : 'Opprett'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {showModal && (
            <InfoModal showModal={showModal} setShowModal={setShowModal} />
          )}
          {redirectHome && (
            <Redirect
              to={{
                pathname: '/home',
              }}
            />
          )}
        </Paper>
      );
    case 'chat':
      return (
        <CreateChat
          onGoBack={onGoBack}
          formDataEdit={formDataEdit}
          onSubmitPost={onSubmitPost}
          onSubmitPut={onSubmitPut}
        />
      );
    case 'forstaelse':
      return (
        <CreateForstaelse
          onGoBack={onGoBack}
          formDataEdit={formDataEdit}
          onSubmitPost={onSubmitPost}
          onSubmitPut={onSubmitPut}
        />
      );
    case 'rydde_setninger':
      return (
        <CreateRyddeSetninger
          onGoBack={onGoBack}
          formDataEdit={formDataEdit}
          onSubmitPost={onSubmitPost}
          onSubmitPut={onSubmitPut}
        />
      );
    case 'confirmation':
      return (
        <Redirect
          to={{
            pathname: '/home',
          }}
        />
      );
    default:
      return <> </>;
  }
};

export default CreateExercises;
