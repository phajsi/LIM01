import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import CreateForstaelse from '../../components/CreateExerciseForms/CreateForstaelse';
import CreateChat from '../../components/CreateExerciseForms/CreateChat';
import CreateRyddeSetninger from '../../components/CreateExerciseForms/CreateRyddeSetninger';
import CreateExerciseMenu from '../../components/CreateExerciseMenu/CreateExerciseMenu';
import { axiosInstance, axiosInstanceDelete } from '../../helpers/ApiFunctions';

/**
 * Handles all the backend CRUD requests for sets and exercises
 * and keeps track of the current set being made.
 * @author Simen, Maja
 * @returns A exercise component based on the current case.
 */
const CreateExercises = () => {
  const location = useLocation();

  const [step, setStep] = useState('Menu');
  // Object which contains formData from the exercise the user wants to edit.
  const [formDataEdit, setFormDataEdit] = useState(null);
  // Object which contains all the IDs for the exercises added to the set.
  const [formDataSet, setFormDataSet] = useState({});
  // Keeps track of count to make sure no more than 5 of each are added.
  const [exerciseCounts, setExerciseCounts] = useState({ c: 0, f: 0, r: 0 });

  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * This function updates the formData for the current exercise set being made.
   * It deletes all entries in the object before adding them back with the correct number.
   * I.e. it makes sure that chat2 will always be added before chat3 if both are empty.
   * It also updates the exercise counts which keeps track of how many exercises are in the set,
   * and that it is not possible to add more than 5.
   * @param {object} form The function formDataSet as input.
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
    setErrorMessage(null);
  }

  // Updates formdata for the set if user wants to edit an already existing set.
  useEffect(() => {
    // location.state?... is the state/props passed from the Redirect.
    if (location.state?.editSet) {
      updateSet(location.state?.formSets);
    }
  }, []);

  /**
   * Regular post request to the backend for the exercises being created in the set.
   * @param {object} values FormData object for the exercise being created.
   * @param {string} url An url to the correct exercise type backend.
   * @param {string} type Either chat, forstaelse or ryddeSetninger.
   */
  const onSubmitPost = (values, url, type) => {
    axiosInstance()
      .post(url, values)
      .then((response) => {
        // This line is adding a row to the formDataSetObject. i.e formdataSet.chat3 = id.
        formDataSet[`${type}${[exerciseCounts[type.substring(0, 1)] + 1]}`] =
          response.data.id;
        updateSet(formDataSet);
        setStep('Menu');
      })
      .catch((e) => {
        return e;
      });
  };

  // Same as the function above, but is used when a user wants to edit an existing exercise in the set.
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
   * @param {number} id The id for the exercise which will be edited.
   * @param {string} exerciseType Type of exercise to be edited.
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
   * If a user tries to delete the last exercise in an already existing set, an error is thrown.
   * @param {string} exercise Name of exercise. i.e chat4.
   * @param {string} url An url to the delete api endpoint.
   */
  function onDeleteExercise(exercise, url) {
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

  /**
   * After the user has finished creating/editing exercises in the set,
   * this function will be run.
   * If a user is editing an existing set, a put request will be sent.
   * If a new set is made, a post request will be sent.
   */

  function onSubmitSet() {
    if (
      !formDataSet.chat1 &&
      !formDataSet.forstaelse1 &&
      !formDataSet.ryddeSetninger1
    ) {
      setErrorMessage(
        'Du må legge til minst en oppgave for å opprette et sett.'
      );
    } else if (location.state?.editSet) {
      axiosInstance()
        .put(`/createsets/${formDataSet.id}`, formDataSet)
        .then(() => {
          setStep('confirmation');
        })
        .catch(() => {
          setErrorMessage(
            'Noe gikk galt! Husk at du må legge til tittel og beskrivelse'
          );
        });
    } else {
      axiosInstance()
        .post('/createsets/', formDataSet)
        .then(() => {
          setStep('confirmation');
        })
        .catch(() => {
          setErrorMessage(
            'Noe gikk galt! Husk at du må legge til tittel og beskrivelse'
          );
        });
    }
  }

  // Function to reset formdataedit if a user doesn't want to edit the exercise.
  function onGoBack() {
    setFormDataEdit(null);
    setStep('Menu');
  }

  switch (step) {
    case 'Menu':
      return (
        <CreateExerciseMenu
          onSubmitSet={onSubmitSet}
          onDeleteExercise={onDeleteExercise}
          editExercise={editExercise}
          exerciseCounts={exerciseCounts}
          setStep={setStep}
          formDataSet={formDataSet}
          errorMessage={errorMessage}
        />
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
