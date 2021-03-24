import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Paper, MenuList, MenuItem, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CreateForstaelse from '../../components/CreateForstaelse/CreateForstaelse';
import CreateChat from '../../components/CreateChat/CreateChat';
import CreateRyddeSetninger from '../../components/CreateRyddeSetninger';
import useStyles from './styles';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    'Content-Type': 'application/json',
    // eslint-disable-next-line prettier/prettier
    accept: 'application/json',
  },
});

const axiosInstanceDelete = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
  timeout: 5000,
  headers: {
    // eslint-disable-next-line prettier/prettier
    'Authorization': `JWT ${localStorage.getItem('access')}`,
    accept: 'application/json',
  },
});

const CreateExercises = () => {
  const classes = useStyles();
  const [step, setStep] = useState('Menu');
  const [forstaelseCount, setForstaelseCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [ryddeSetningerCount, setRyddeSetningerCount] = useState(0);
  const [playId, setPlayId] = useState(0);
  const [forstaelseList] = useState([null, null, null, null, null]);
  const [chatList] = useState([null, null, null, null, null]);
  const [ryddeSetningerList] = useState([null, null, null, null, null]);
  const [emptySetError, setEmptySetError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);

  function updateFormDataForstaelse(id) {
    forstaelseList[forstaelseCount] = id;
    setForstaelseCount(forstaelseCount + 1);
  }

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

  useEffect(() => {
    if (editId !== null) {
      setStep(currentExercise);
    }
  }, [editId]);

  function updateFormDataRyddeSetninger(id) {
    ryddeSetningerList[ryddeSetningerCount] = id;
    setRyddeSetningerCount(ryddeSetningerCount + 1);
  }

  function updateFormDataChat(id) {
    chatList[chatCount] = id;
    setChatCount(chatCount + 1);
  }

  function setExercise(step) {
    setEmptySetError(null);
    setStep(step);
  }

  function postContent() {
    if (forstaelseCount === 0 && chatCount === 0 && ryddeSetningerCount === 0) {
      setEmptySetError(
        'Du må legge til minst en øvelse for å opprette et sett.'
      );
    } else {
      axiosInstance
        .post('/createsets/', {
          forstaelse1: forstaelseList[0],
          forstaelse2: forstaelseList[1],
          forstaelse3: forstaelseList[2],
          forstaelse4: forstaelseList[3],
          forstaelse5: forstaelseList[4],
          chat1: chatList[0],
          chat2: chatList[1],
          chat3: chatList[2],
          chat4: chatList[3],
          chat5: chatList[4],
          ryddeSetninger1: ryddeSetningerList[0],
          ryddeSetninger2: ryddeSetningerList[1],
          ryddeSetninger3: ryddeSetningerList[2],
          ryddeSetninger4: ryddeSetningerList[3],
          ryddeSetninger5: ryddeSetningerList[4],
        })
        .then((response) => {
          setPlayId(response.data.id);
          setStep('confirmation');
        })
        .catch((e) => {
          return e;
        });
    }
  }

  function onDelete(id, type, url) {
    axiosInstanceDelete
      .delete(url)
      .then(() => {
        if (type === 1) {
          chatList[chatList.indexOf(id)] = null;
          setChatCount(chatCount - 1);
        } else if (type === 2) {
          forstaelseList[forstaelseList.indexOf(id)] = null;
          setForstaelseCount(forstaelseCount - 1);
        } else {
          ryddeSetningerList[ryddeSetningerList.indexOf(id)] = null;
          setRyddeSetningerCount(ryddeSetningerCount - 1);
        }
      })
      .catch((e) => {
        return e;
      });
  }

  switch (step) {
    case 'Menu':
      return (
        <div>
          <Paper className={classes.root}>
            <h1>Velg oppgavetype</h1>
            <MenuList>
              {chatList[4] !== null ? (
                <></>
              ) : (
                <MenuItem onClick={() => setExercise('Chat')} id="Chat">
                  Chat
                </MenuItem>
              )}
              {forstaelseList[4] !== null ? (
                <></>
              ) : (
                <MenuItem
                  onClick={() => setExercise('forstaelse')}
                  id="Forståelse"
                >
                  Forståelse
                </MenuItem>
              )}
              {ryddeSetningerList[4] !== null ? (
                <></>
              ) : (
                <MenuItem
                  onClick={() => setExercise('Rydde Setninger')}
                  id="RyddeSetninger"
                >
                  Rydde Setninger
                </MenuItem>
              )}
            </MenuList>
            {emptySetError && <h4>{emptySetError}</h4>}
            <Button
              variant="contained"
              color="secondary"
              onClick={postContent}
              fullWidth
            >
              Opprett
            </Button>
          </Paper>
          <Paper className={classes.root}>
            <h4>Øvelser:</h4>
            {chatList.map((id) => {
              if (id !== null) {
                return (
                  <Chip
                    label="Chat"
                    onDelete={() => onDelete(id, 1, `/deletechat/${id}`)}
                  />
                );
              }
              return <></>;
            })}
            {forstaelseList.map((id) => {
              if (id !== null) {
                return (
                  <Chip
                    label="Forstaelse"
                    onDelete={() => onDelete(id, 2, `/deleteforstaelse/${id}`)}
                    onClick={() => editExercise(id, 'forstaelse')}
                  />
                );
              }
              return <></>;
            })}
            {ryddeSetningerList.map((id) => {
              if (id !== null) {
                return (
                  <Chip
                    label="Rydde Setninger"
                    onDelete={() =>
                      // eslint-disable-next-line prettier/prettier
                      onDelete(id, 3, `/delete_rydde_setninger/${id}`)}
                  />
                );
              }
              return <></>;
            })}
          </Paper>
        </div>
      );
    case 'Chat':
      return (
        <CreateChat updateFormDataChat={updateFormDataChat} setStep={setStep} />
      );
    case 'forstaelse':
      return (
        <CreateForstaelse
          updateFormDataForstaelse={updateFormDataForstaelse}
          setStep={setStep}
          editId={editId}
          formDataEditForstaelse={formDataEdit}
          setEditId={setEditId}
        />
      );
    case 'Rydde Setninger':
      return (
        <CreateRyddeSetninger
          updateFormDataRyddeSetninger={updateFormDataRyddeSetninger}
          setStep={setStep}
        />
      );
    case 'confirmation':
      return (
        <div>
          <h1>
            Takk! Settet kan spilles med id:
            {playId}
          </h1>
          <Link to="/" className={classes.title}>
            Hjemmeside
          </Link>
        </div>
      );
    default:
      return <> </>;
  }
};

export default CreateExercises;
