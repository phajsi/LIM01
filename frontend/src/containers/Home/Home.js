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

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [playId, setPlayId] = useState(null);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [redirectEdit, setRedirectEdit] = useState(false);
  const [redirectPlay, setRedirectPlay] = useState(false);

  const [error, setError] = useState(false);

  function getContent() {
    const requestOne = axiosInstance().get(`/usersets/`);
    const requestTwo = axiosInstance().get(`/saved/`);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...res) => {
          setExerciseSetList(res[0].data);
          setSavedList(res[1].data);
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

  const onChange = (e) => setPlayId(e.target.value);

  function playSet() {
    if (!playId) {
      setError(true);
    } else {
      setRedirectPlay(true);
    }
  }

  return (
    <div className={classes.root}>
      <h3 className={classes.searchTitle}> Søk med sett ID </h3>
      <SearchBar onChange={onChange} playSet={playSet} error={error} />
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
      {redirectEdit ? (
        <Redirect
          to={{
            pathname: '/createexercise',
            state: { formSets: formDataEdit, editSet: true },
          }}
        />
      ) : (
        <> </>
      )}
      {redirectPlay ? (
        <Redirect
          to={{
            pathname: '/sets',
            state: { id: playId },
          }}
        />
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Home;
