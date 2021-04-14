import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { axiosInstanceDelete, axiosInstance } from '../../helpers/ApiFunctions';
import SearchBar from '../../components/SearchBar/SearchBar';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  const [ExerciseSetList, setExerciseSetList] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const [redirectPlay, setRedirectPlay] = useState(false);
  const [playId, setPlayId] = useState(null);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formDataEdit, setFormDataEdit] = useState(null);
  const [redirectEdit, setRedirectEdit] = useState(false);

  function getContent() {
    const requestOne = axiosInstance().get(`/usersets/`);
    const requestTwo = axiosInstance().get(`/saved/`);
    const requestThree = axiosInstance().get(`/usercompleted/`);
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...res) => {
          setExerciseSetList(res[0].data);
          setSavedList(res[1].data);
          setCompletedList(res[2].data);
        })
      )
      .catch((e) => {
        return e;
      });
  }

  useEffect(() => {
    getContent();
  }, []);

  function onDelete(id) {
    axiosInstanceDelete()
      .delete(`/deletesets/${id}`)
      .then(() => {
        setOpen(false);
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  function removeSaved(id) {
    axiosInstanceDelete()
      .delete(`/saved/${id}`)
      .then(() => {
        getContent();
      })
      .catch((e) => {
        return e;
      });
  }

  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <h3 className={classes.searchTitle}> Søk med sett ID </h3>
        <SearchBar />
        <h3>Mine oppgavesett</h3>
        {ExerciseSetList.map((set) => {
          return (
            <Chip
              avatar={<Avatar>{set.id}</Avatar>}
              label="sett"
              onDelete={() => {
                setDeleteId(set.id);
                setOpen(true);
              }}
              onClick={() => {
                setFormDataEdit(set);
                setRedirectEdit(true);
              }}
            />
          );
        })}
      </div>
      <div className={classes.infoBox}>
        <h3>Lagrede sett</h3>
        {savedList.map((saved) => {
          return (
            <Chip
              avatar={<Avatar>{saved.sets}</Avatar>}
              label="Lagret Sett"
              onDelete={() => {
                removeSaved(saved.sets);
              }}
              onClick={() => {
                setPlayId(saved.sets);
                setRedirectPlay(true);
              }}
            />
          );
        })}
        <h3>Fullførte sett</h3>
        {completedList.map((completed) => {
          return (
            <Chip
              avatar={<Avatar>{completed.sets}</Avatar>}
              label="Fullført Sett"
              onClick={() => {
                setPlayId(completed.sets);
                setRedirectPlay(true);
              }}
            />
          );
        })}
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bekreft Sletting</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Er du sikker på at du vil slette hele oppgavesettet? Det vil bli
            borte for alltid.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Avbryt
          </Button>
          <Button onClick={() => onDelete(deleteId)} color="primary" autoFocus>
            Slett
          </Button>
        </DialogActions>
      </Dialog>
      {redirectEdit && (
        <Redirect
          to={{
            pathname: '/createexercise',
            state: { formSets: formDataEdit, editSet: true },
          }}
        />
      )}
      {redirectPlay && (
        <Redirect
          to={{
            pathname: '/sets',
            state: { id: playId },
          }}
        />
      )}
    </div>
  );
};

export default Home;
