/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
  Divider,
  Card,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { Link, Redirect } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PersonIcon from '@material-ui/icons/Person';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { axiosInstanceDelete, axiosInstance } from '../../helpers/ApiFunctions';
import SearchBar from '../../components/SearchBar/SearchBar';
import SaveIcon from '../../components/SaveIcon';
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

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return (
          <>
            {ExerciseSetList.map((set) => {
              return (
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar className={classes.avatar}>{set.id}</Avatar>
                    }
                    title={set.title}
                    subheader={
                      <>
                        <PersonIcon style={{ fontSize: 15 }} />
                        {` `}
                        Deg
                      </>
                    }
                    action={
                      <>
                        <IconButton
                          onClick={() => {
                            setFormDataEdit(set);
                            setRedirectEdit(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setDeleteId(set.id);
                            setOpen(true);
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </>
                    }
                  />
                </Card>
              );
            })}
          </>
        );
      case 1:
        return (
          <>
            {savedList.map((saved) => {
              return (
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar className={classes.avatar}>{saved.sets}</Avatar>
                    }
                    title={saved.title}
                    subheader={
                      <>
                        <PersonIcon style={{ fontSize: 15 }} />
                        {` `}
                        {saved.setOwner}
                      </>
                    }
                    action={
                      <>
                        <SaveIcon id={saved.sets} />
                        <IconButton
                          onClick={() => {
                            setPlayId(saved.sets);
                            setRedirectPlay(true);
                          }}
                        >
                          <PlayCircleOutlineIcon style={{ fontSize: 30 }} />
                        </IconButton>
                      </>
                    }
                  />
                </Card>
              );
            })}
          </>
        );
      case 2:
        return (
          <>
            {completedList.map((completed) => {
              return (
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    avatar={
                      <Avatar className={classes.avatar}>
                        {completed.sets}
                      </Avatar>
                    }
                    title={completed.title}
                    subheader={
                      <>
                        <PersonIcon style={{ fontSize: 15 }} />
                        {` `}
                        {completed.setOwner}
                        {`  -  `}
                        <WhatshotIcon style={{ fontSize: 15 }} />
                        {`${completed.score}/${completed.score}`}
                      </>
                    }
                    action={
                      <>
                        <SaveIcon id={completed.sets} />
                        <IconButton
                          onClick={() => {
                            setPlayId(completed.sets);
                            setRedirectPlay(true);
                          }}
                        >
                          <PlayCircleOutlineIcon style={{ fontSize: 30 }} />
                        </IconButton>
                      </>
                    }
                  />
                </Card>
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
                <ListItem
                  button
                  component={Link}
                  to="/createexercise"
                  className={classes.drawerBtn}
                  style={{ textAlign: 'center' }}
                >
                  <ListItemText>Opprett oppgavesett</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <List>
                {['Mine sett', 'Lagrede sett', 'Fullførte sett'].map(
                  (text, index) => (
                    <ListItem
                      button
                      selected={showSetType === index}
                      className={classes.drawerBtn}
                      key={text}
                      onClick={() => setShowSetType(index)}
                    >
                      <ListItemIcon>
                        {index === 0 && (
                          <CollectionsBookmarkIcon className={classes.svg} />
                        )}
                        {index === 1 && (
                          <FavoriteIcon className={classes.svg} />
                        )}
                        {index === 2 && <DoneIcon className={classes.svg} />}
                      </ListItemIcon>
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
                  id={index}
                  key={text}
                  onClick={() => setShowSetType(index)}
                  variant="outlined"
                  size="small"
                  className={classes.drawerBtn}
                >
                  {text}
                </Button>
              )
            )}
          </div>
        </Hidden>
        <br />
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
