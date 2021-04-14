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
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
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
  const [showSetType, setShowSetType] = useState(0);

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

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return (
          <>
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
          </>
        );
      case 1:
        return (
          <>
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
          </>
        );
      case 2:
        return (
          <>
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
          </>
        );
      default:
        return <> </>;
    }
  };

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div>
              <div className={classes.toolbar} />
              <List>
                {['Mine sett', 'Lagrede sett', 'Fullførte sett'].map(
                  (text, index) => (
                    <ListItem
                      button
                      style={{ textAlign: 'center' }}
                      key={text}
                      onClick={() => setShowSetType(index)}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <SearchBar />
        <Hidden smUp implementation="css">
          <div className={classes.buttonList}>
            {['Mine sett', 'Lagrede sett', 'Fullførte sett'].map(
              (text, index) => (
                <Button
                  key={text}
                  onClick={() => setShowSetType(index)}
                  variant="outlined"
                  size="small"
                  style={{ textTransform: 'none' }}
                >
                  {text}
                </Button>
              )
            )}
          </div>
        </Hidden>
        {renderSwitch(showSetType)}
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
