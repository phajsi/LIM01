import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { Link, Redirect } from 'react-router-dom';
import { axiosInstanceDelete, axiosInstance } from '../../helpers/ApiFunctions';
import SearchBar from '../../components/SearchBar/SearchBar';
import SetCard from '../../components/SetCard/SetCard';
import DeleteModal from '../../components/DeleteModal';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  // three lists that are updated with data from backend when the page renders.
  // list of the users own sets
  const [ExerciseSetList, setExerciseSetList] = useState([]);
  // list of saved sets
  const [savedList, setSavedList] = useState([]);
  // list of completed played sets
  const [completedList, setCompletedList] = useState([]);

  const [showSetType, setShowSetType] = useState(0);

  // used to redirect if the user has clicked on the play icon on a card
  const [redirectPlay, setRedirectPlay] = useState(false);
  const [playId, setPlayId] = useState(null);

  // two variables used for the delete modal
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // used to redirect if the user has clicked on the edit icon on a card
  const [formDataEdit, setFormDataEdit] = useState(null);
  const [redirectEdit, setRedirectEdit] = useState(false);

  /**
   * Sends three requests to backend to get necessary data
   * first request gets the sets the user has made
   * second request gets the user's saved sets
   * the third request gets the user's completed sets
   */
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

  // only runs once when the page renders and gets the necessary content from backend
  useEffect(() => {
    getContent();
  }, []);

  // deletes an exercise set that the user has made.
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

  // returns the correct list of cards depending on what "tab" the user has chosen
  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return (
          <>
            {ExerciseSetList.map((set) => {
              return (
                <SetCard
                  type="mySet"
                  formData={set}
                  onClick1={() => {
                    setFormDataEdit(set);
                    setRedirectEdit(true);
                  }}
                  onClick2={() => {
                    setDeleteId(set.id);
                    setOpen(true);
                  }}
                  onClick3={() => {
                    setPlayId(set.id);
                    setRedirectPlay(true);
                  }}
                />
              );
            })}
          </>
        );
      case 1:
        return (
          <>
            {savedList.map((saved) => {
              return (
                <SetCard
                  type="favorite"
                  formData={saved}
                  onClick1={() => {
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
            {completedList.map((completed) => {
              return (
                <SetCard
                  type="completed"
                  formData={completed}
                  onClick1={() => {
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
    <>
      <div className={classes.searchBar}>
        <SearchBar />
      </div>
      <div className={classes.root}>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <div>
                <div className={classes.spacing} />
                <List>
                  <ListItem
                    button
                    component={Link}
                    to="/createexercise"
                    className={classes.drawerBtn}
                    style={{ textAlign: 'center', border: 'solid 1px #367051' }}
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
          <Hidden smUp implementation="css">
            <div className={classes.buttonList}>
              {['Mine sett', 'Lagrede sett', 'Fullførte sett'].map(
                (text, index) => (
                  <Button
                    autoFocus={showSetType === index}
                    disableRipple
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
        {open && (
          <DeleteModal
            onDelete={() => onDelete(deleteId)}
            open={open}
            setOpen={setOpen}
          />
        )}
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
    </>
  );
};

export default Home;
