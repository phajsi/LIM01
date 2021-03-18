import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Paper, MenuList, MenuItem, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CreateForstaelse from '../../components/CreateForstaelse/CreateForstaelse';
import CreateChat from '../../components/CreateChat/CreateChat';
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
  const [playId, setPlayId] = useState(0);
  const [forstaelseList] = useState([null, null, null, null, null]);
  const [chatList] = useState([null, null, null, null, null]);
  const [emptySetError, setEmptySetError] = useState(null);

  function updateFormDataForstaelse(id) {
    forstaelseList[forstaelseCount] = id;
    setForstaelseCount(forstaelseCount + 1);
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
    if (forstaelseCount === 0 && chatCount === 0) {
      setEmptySetError(
        'Du må legge til minst en øvelse for å opprette et sett'
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
        } else {
          forstaelseList[forstaelseList.indexOf(id)] = null;
          setForstaelseCount(forstaelseCount - 1);
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
                  onClick={() => setExercise('Forståelse')}
                  id="Forståelse"
                >
                  Forståelse
                </MenuItem>
              )}
              <MenuItem
                onClick={() => setExercise('Rydde Setninger')}
                id="Rydde Setninger"
              >
                Rydde Setninger
              </MenuItem>
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
    case 'Forståelse':
      return (
        <CreateForstaelse
          updateFormDataForstaelse={updateFormDataForstaelse}
          setStep={setStep}
        />
      );
    case 'Rydde Setninger':
      return (
        <Paper>
          <h2>Rydde Setninger</h2>
        </Paper>
      );
    case 'confirmation':
      return (
        <div>
          <h1>
            Thank you! the set can be played with id:
            {playId}
          </h1>
          <Link to="/" className={classes.title}>
            Finish
          </Link>
        </div>
      );
    default:
      return <> </>;
  }
};

export default CreateExercises;
