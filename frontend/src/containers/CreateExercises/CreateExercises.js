import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paper, MenuList, MenuItem, Button } from '@material-ui/core';
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
  const [playId, setPlayId] = useState(0);
  const [emptySetError, setEmptySetError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);

  const [formDataSet, setFormDataSet] = useState({});
  const [exerciseCounts, setExerciseCounts] = useState({ c: 0, f: 0, r: 0 });

  // used to check whether the user is editing an existing set or creating a new one
  const [editSet, setEditSet] = useState(false);

  function updateCounts() {
    let ch = 0;
    let fo = 0;
    let ry = 0;
    // eslint-disable-next-line array-callback-return
    Object.keys(formDataSet).map((exercise) => {
      if (exercise[0] === 'c') {
        ch += 1;
      } else if (exercise[0] === 'f') {
        fo += 1;
      } else {
        ry += 1;
      }
    });
    setExerciseCounts((prevState) => ({ ...prevState, c: ch, f: fo, r: ry }));
  }

  /**
   * This function is called after an exercise has been
   * created backend from one of the createExercise types.
   * It adds the exercise to the formdata for the set
   * and increments the counter for that exercise type.
   * @param {*} id the id for the exercise that has been created
   * @param {*} type what type of exercise it is
   */

  function updateSet(id, type) {
    if (type === 2) {
      formDataSet[`chat${[exerciseCounts.c + 1]}`] = id;
    } else if (type === 1) {
      formDataSet[`forstaelse${[exerciseCounts.f + 1]}`] = id;
    } else {
      formDataSet[`ryddeSetninger${[exerciseCounts.r + 1]}`] = id;
    }
    updateCounts();
    setEmptySetError(null);
  }

  /**
   * The function is used to retrieve the data from the exercise the user wants to edit.
   * It saves the return data and if in local states
   * which is passed as prop to the corresponding create Exercise type.
   * @param {*} id id for the exercise which will be edited
   * @param {*} exerciseType type of exercise to be edited
   */
  function editExercise(id, exerciseType) {
    axiosInstance
      .get(`/${exerciseType}/${id}`)
      .then((res) => {
        setFormDataEdit(res.data);
        setCurrentExercise(exerciseType);
        setEditId(id);
      })
      .catch((e) => {
        return e;
      });
  }

  // used to change step correctly when a user wants to edit an exercise
  useEffect(() => {
    if (editId !== null) {
      setStep(currentExercise);
    }
  }, [editId]);

  // updates formdata for the set if user wants to edit an already existing set
  useEffect(() => {
    if (location.state?.editSet && !editSet) {
      setFormDataSet(location.state?.formSets);
      setEditSet(true);
    }
  });

  useEffect(() => {
    updateCounts();
  }, [formDataSet]);

  function postContent() {
    if (Object.keys(formDataSet).length === 0) {
      setEmptySetError(
        'Du må legge til minst en oppgave for å opprette et sett.'
      );
    } else if (!editSet) {
      axiosInstance
        .post('/createsets/', formDataSet)
        .then((response) => {
          setPlayId(response.data.id);
          setStep('confirmation');
        })
        .catch((e) => {
          return e;
        });
    } else if (Object.keys(formDataSet).length === 1 && editSet) {
      setEmptySetError(
        'Du må legge til minst en oppgave for å opprette et sett.'
      );
    } else if (editSet) {
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

  function onDelete(exercise, url) {
    if (editSet && Object.keys(formDataSet).length === 2) {
      setEmptySetError('Det må være igjen minst en oppgave i settet.');
    } else {
      axiosInstanceDelete
        .delete(url)
        .then(() => {
          delete formDataSet[exercise];
          updateCounts();
        })
        .catch((e) => {
          return e;
        });
    }
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
            {emptySetError && <h4>{emptySetError}</h4>}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => postContent()}
              fullWidth
            >
              {editSet ? 'Endre' : 'Opprett'}
            </Button>
          </Paper>
          <Paper className={classes.menu}>
            <h4>Øvelser:</h4>
            {Object.entries(formDataSet).map(([type, id]) => {
              if (type[0] === 'c') {
                return (
                  <Chip
                    label="Chat"
                    onDelete={() => onDelete(type, `/deletechat/${id}`)}
                    onClick={() => editExercise(id, 'chat')}
                  />
                );
              }
              return <></>;
            })}
            {Object.entries(formDataSet).map(([type, id]) => {
              if (type[0] === 'f') {
                return (
                  <Chip
                    label="Forstaelse"
                    onDelete={() =>
                      // eslint-disable-next-line prettier/prettier
                      onDelete(type, `/deleteforstaelse/${id}`)}
                    onClick={() => editExercise(id, 'forstaelse')}
                  />
                );
              }
              return <></>;
            })}
            {Object.entries(formDataSet).map(([type, id]) => {
              if (type[0] === 'r') {
                return (
                  <Chip
                    label="Rydde Setninger"
                    onDelete={() =>
                      // eslint-disable-next-line prettier/prettier
                      onDelete(type, `/delete_rydde_setninger/${id}`)}
                    onClick={() => editExercise(id, 'rydde_setninger')}
                  />
                );
              }
              return <></>;
            })}
          </Paper>
        </div>
      );
    case 'chat':
      return (
        <CreateChat
          updateFormData={updateSet}
          setStep={setStep}
          editId={editId}
          formDataEdit={formDataEdit}
          setEditId={setEditId}
        />
      );
    case 'forstaelse':
      return (
        <CreateForstaelse
          updateFormData={updateSet}
          setStep={setStep}
          editId={editId}
          formDataEditForstaelse={formDataEdit}
          setEditId={setEditId}
        />
      );
    case 'rydde_setninger':
      return (
        <CreateRyddeSetninger
          updateFormData={updateSet}
          setStep={setStep}
          editId={editId}
          formDataEdit={formDataEdit}
          setEditId={setEditId}
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
