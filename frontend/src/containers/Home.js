/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
import { axiosInstance, axiosInstanceDelete } from '../helpers/ApiFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    color: 'black',
    height: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  infoBox: {
    margin: 'auto',
    padding: theme.spacing(2),
    width: '50%',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [ExerciseSetList, setExerciseSetList] = useState(null);
  const [setsIdList, setSetsIdList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [redirect, setRedircet] = useState(false);
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [savedIdsList, setSavedIdsList] = useState([]);

  function getContent() {
    const list = [];
    axiosInstance
      .get(`/usersets/`)
      .then((res) => {
        res.data.map((sets) => list.push(sets.id));
        setSetsIdList(list);
        setExerciseSetList(res.data);
      })
      .catch((e) => {
        return e;
      });
  }

  function getSaved() {
    const savedList = [];
    axiosInstance
      .get(`/saved/`)
      .then((res) => {
        res.data.map((sets) => savedList.push(sets.sets));
        setSavedIdsList(savedList);
      })
      .catch((e) => {
        return e;
      });
  }

  useEffect(() => {
    if (ExerciseSetList === null) {
      getContent();
      getSaved();
    }
  });

  function onDelete(id) {
    axiosInstanceDelete
      .delete(`/deletesets/${id}`)
      .then(() => {
        getContent();
        setOpen(false);
      })
      .catch((e) => {
        return e;
      });
  }

  // eslint-disable-next-line no-unused-vars
  function editExerciseSet(id) {
    ExerciseSetList.map((exercise) => {
      if (exercise.id === id) {
        const setUpdate = exercise;
        Object.entries(exercise).map(([type, id]) => {
          if (id === null) {
            delete setUpdate[type];
          }
        });
        setFormDataEdit(setUpdate);
        setRedircet(true);
      }
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.infoBox}>
        <h3>Dine oppgavesett:</h3>
        {setsIdList.map((id) => {
          return (
            <Chip
              avatar={<Avatar>{id}</Avatar>}
              label="sett"
              onDelete={() => {
                setDeleteId(id);
                setOpen(true);
              }}
              onClick={() => editExerciseSet(id)}
            />
          );
        })}
      </div>
      <div className={classes.infoBox}>
        <h3>Dine Lagrede sett:</h3>
        {savedIdsList.map((id) => {
          return (
            <Chip
              avatar={<Avatar>{id}</Avatar>}
              label="Lagret Sett"
              onDelete={() => {
                setDeleteId(id);
                setOpen(true);
              }}
              onClick={() => editExerciseSet(id)}
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
      {redirect ? (
        <Redirect
          to={{
            pathname: '/createexercise',
            state: { formSets: formDataEdit, editSet: true },
          }}
        />
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Home;
