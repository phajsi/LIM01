import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Paper,
  MenuList,
  MenuItem,
  Button,
  TextField,
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CreateForstaelse from '../../components/CreateForstaelse/CreateForstaelse';
import CreateChat from '../../components/CreateChat/CreateChat';
import CreateRyddeSetninger from '../../components/CreateRyddeSetninger';
import useStyles from './styles';
import { axiosInstance, axiosInstanceDelete } from '../../helpers/ApiFunctions';

const CreateExercises = () => {
  const classes = useStyles();
  const location = useLocation();

  const [step, setStep] = useState('Menu');
  const [emptySetError, setEmptySetError] = useState(null);
  // object which contains formData from the exercise the user wants to edit
  const [formDataEdit, setFormDataEdit] = useState(null);
  // object which contains all the IDs for the exercises added to the set.
  const [formDataSet, setFormDataSet] = useState({});
  const [playId, setPlayId] = useState(0);
  // keeps track of count to make sure no more than 5 of each are added.
  const [exerciseCounts, setExerciseCounts] = useState({ c: 0, f: 0, r: 0 });
  // bool used to check whether the user is editing an existing set or creating a new one
  const [editSet, setEditSet] = useState(false);

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
    const count = { c: 1, f: 1, r: 1 };
    Object.entries(formData).forEach(([type, id]) => {
      if (type.substring(0, 4) === 'chat') {
        // deletes the exercise
        delete formData[type];
        // adds it back in to the right position
        formData[`chat${[count.c]}`] = id;
        // updates the count
        count.c += 1;
      } else if (type.substring(0, 4) === 'fors') {
        delete formData[type];
        formData[`forstaelse${[count.f]}`] = id;
        count.f += 1;
      } else if (type.substring(0, 4) === 'rydd') {
        delete formData[type];
        formData[`ryddeSetninger${[count.r]}`] = id;
        count.r += 1;
      }
    });
    setFormDataSet(formData);
    setExerciseCounts((prevState) => ({
      ...prevState,
      c: count.c - 1,
      f: count.f - 1,
      r: count.r - 1,
    }));
  }

  // updates formdata for the set if user wants to edit an already existing set
  useEffect(() => {
    // location.state?... is the state/props passed from the Redirect.
    if (location.state?.editSet && !editSet) {
      updateSet(location.state?.formSets);
      setEditSet(true);
    }
  });

  /**
   * regular post request to the backend for the exercises being created in the set.
   * @param {*} values formData object for the exercise being created
   * @param {*} url url to the correct exercise type backend.
   * @param {*} type either chat, forstaelse or ryddeSetnigner
   */
  const onSubmitPost = (values, url, type) => {
    axiosInstance
      .post(url, values)
      .then((response) => {
        // this line is adding a row to the formDataSetObject. i.e formdataSet.chat3 = id
        formDataSet[`${type}${[exerciseCounts.c + 1]}`] = response.data.id;
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
    axiosInstance
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
    axiosInstance
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
    if (editSet && Object.keys(formDataSet).length === 2) {
      setEmptySetError('Det må være igjen minst en oppgave i settet.');
    } else {
      axiosInstanceDelete
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
    if (Object.keys(formDataSet).slice(2).length === 0) {
      setEmptySetError(
        'Du må legge til minst en oppgave for å opprette et sett.'
      );
    } else {
      axiosInstance
        .post('/createsets/', formDataSet)
        .then((response) => {
          setPlayId(response.data.id);
          setStep('confirmation');
        })
        .catch((e) => {
          return e;
        });
    }
  }

  function onSubmitPutSet() {
    if (Object.keys(formDataSet).length === 1 && editSet) {
      setEmptySetError(
        'Du må legge til minst en oppgave for å opprette et sett.'
      );
    } else {
      axiosInstance
        .put(`/createsets/${formDataSet.id}`, formDataSet)
        .then((response) => {
          setPlayId(response.data.id);
          setStep('confirmation');
        })
        .catch((e) => {
          return e;
        });
    }
  }

  // function to reset formdataedit if a user doesnt want to edit the exercise
  function onGoBack() {
    setFormDataEdit(null);
    setStep('Menu');
  }

  switch (step) {
    case 'Menu':
      return (
        <div className={classes.root}>
          <Paper className={classes.menu}>
            <h1>Velg oppgavetype</h1>
            <MenuList>
              <MenuItem
                disabled={exerciseCounts.c > 4}
                onClick={() => setStep('chat')}
              >
                Chat
              </MenuItem>
              <MenuItem
                disabled={exerciseCounts.f > 4}
                onClick={() => setStep('forstaelse')}
              >
                Forståelse
              </MenuItem>
              <MenuItem
                disabled={exerciseCounts.r > 4}
                onClick={() => setStep('rydde_setninger')}
              >
                Rydde Setninger
              </MenuItem>
            </MenuList>
          </Paper>
          <Paper className={classes.menu}>
            <h1>Ditt sett</h1>
            <div>
              <p>Gi settet ditt et navn</p>
              <TextField
                name="title"
                multiline
                fullWidth
                rowsMax={1}
                required
                variant="outlined"
                onChange={
                  (e) =>
                    setFormDataSet({
                      ...formDataSet,
                      title: e.target.value,
                    })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
              <p>Gi settet ditt en beskrivelse</p>
              <TextField
                name="description"
                multiline
                fullWidth
                rowsMax={1}
                required
                variant="outlined"
                onChange={
                  (e) =>
                    setFormDataSet({
                      ...formDataSet,
                      description: e.target.value,
                    })
                  // eslint-disable-next-line react/jsx-curly-newline
                }
              />
            </div>
            <h4>Øvelser:</h4>
            {Object.entries(formDataSet).map(([type, id]) => {
              if (type.substring(0, 4) === 'chat') {
                return (
                  <Chip
                    label="Chat"
                    onDelete={() => onDeleteExercise(type, `/deletechat/${id}`)}
                    onClick={() => editExercise(id, 'chat')}
                  />
                );
              }
              if (type.substring(0, 4) === 'fors') {
                return (
                  <Chip
                    label="Forstaelse"
                    onDelete={() =>
                      // eslint-disable-next-line prettier/prettier
                      onDeleteExercise(type, `/deleteforstaelse/${id}`)}
                    onClick={() => editExercise(id, 'forstaelse')}
                  />
                );
              }
              if (type.substring(0, 4) === 'rydd') {
                return (
                  <Chip
                    label="Rydde Setninger"
                    onDelete={() =>
                      // eslint-disable-next-line prettier/prettier
                      onDeleteExercise(type, `/delete_rydde_setninger/${id}`)}
                    onClick={() => editExercise(id, 'rydde_setninger')}
                  />
                );
              }
              return <></>;
            })}
            {emptySetError && <h4>{emptySetError}</h4>}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (editSet) {
                  onSubmitPutSet();
                } else {
                  onSubmitPostSet();
                }
              }}
              fullWidth
            >
              {editSet ? 'Endre' : 'Opprett'}
            </Button>
          </Paper>
        </div>
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
        <div>
          <h1>
            Takk! Settet kan spilles med id:
            {playId}
          </h1>
          <Link to="/home" className={classes.title}>
            Hjemmeside
          </Link>
        </div>
      );
    default:
      return <> </>;
  }
};

export default CreateExercises;
