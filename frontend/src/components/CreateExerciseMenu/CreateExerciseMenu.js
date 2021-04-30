import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Chip,
  Paper,
  MenuList,
  MenuItem,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import InfoModal from '../InfoModal/InfoModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useStyles from './styles';

// TODO
const CreateExerciseMenu = ({
  onSubmitSet,
  onDeleteExercise,
  editExercise,
  setStep,
  formDataSet,
  exerciseCounts,
  errorMessage,
}) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const [redirectHome, setRedirectHome] = useState(false);

  function handleFormChange(input, formDataSet) {
    formDataSet[input.target.name] = input.target.value;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h1" gutterBottom>
        Nytt sett
      </Typography>
      <Grid container className={classes.gridcontainer}>
        <Grid item xs={12} className={classes.form}>
          <Typography className={classes.formfieldname}>Tittel:</Typography>
          <TextField
            name="title"
            multiline
            fullWidth
            rowsMax={1}
            required
            variant="outlined"
            defaultValue={formDataSet.title}
            placeholder="Legg til tittel..."
            onChange={(e) => handleFormChange(e, formDataSet)}
          />
        </Grid>
        <Grid item xs={12} className={classes.form}>
          <Typography className={classes.formfieldname}>
            Beskrivelse:
          </Typography>
          <TextField
            name="description"
            multiline
            fullWidth
            rows={3}
            rowsMax={10}
            required
            variant="outlined"
            defaultValue={formDataSet.description}
            placeholder="Gi settet ditt en beskrivelse..."
            onChange={(e) => handleFormChange(e, formDataSet)}
          />
        </Grid>
        <Grid item md={5} xs={12} className={classes.menu}>
          <Typography variant="h2">Legg til oppgavetyper</Typography>
          <MenuList>
            <Grid className={classes.menugroup}>
              <MenuItem
                className={classes.menuitemchat}
                disabled={exerciseCounts.c > 4}
                onClick={() => setStep('chat')}
              >
                Chat
              </MenuItem>
              <IconButton
                data-testid="chatModal"
                onClick={() => setShowModal('chat')}
              >
                <InfoIcon className={classes.infoicon} />
              </IconButton>
            </Grid>
            <Grid className={classes.menugroup}>
              <MenuItem
                className={classes.menuitemfors}
                disabled={exerciseCounts.f > 4}
                onClick={() => setStep('forstaelse')}
              >
                Forståelse
              </MenuItem>
              <IconButton
                data-testid="forstaelseModal"
                onClick={() => setShowModal('forstaelse')}
              >
                <InfoIcon className={classes.infoicon} />
              </IconButton>
            </Grid>
            <Grid className={classes.menugroup}>
              <MenuItem
                className={classes.menuitemrydd}
                disabled={exerciseCounts.r > 4}
                onClick={() => setStep('rydde_setninger')}
              >
                Rydde Setninger
              </MenuItem>
              <IconButton
                data-testid="ryddeSetningerModal"
                onClick={() => setShowModal('rydde_setninger')}
              >
                <InfoIcon className={classes.infoicon} />
              </IconButton>
            </Grid>
          </MenuList>
        </Grid>
        <Grid item md={7} xs={12} className={classes.menu}>
          <Typography variant="h2">Oppgaver</Typography>
          <Grid container>
            {Object.entries(formDataSet).map(([type, id], index) => {
              if (type.substring(0, 4) === 'chat') {
                return (
                  <Grid key={index} item xs={6} className={classes.chipgrid}>
                    <Chip
                      className={classes.chatchip}
                      label="Chat"
                      onClick={() => editExercise(id, 'chat')}
                    />
                    <IconButton
                      className={classes.deletebutton}
                      onClick={() =>
                        onDeleteExercise(type, `/deletechat/${id}`)
                      }
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Grid>
                );
              }
              if (type.substring(0, 4) === 'fors') {
                return (
                  <Grid key={index} item xs={6} className={classes.chipgrid}>
                    <Chip
                      className={classes.forschip}
                      label="Forstaelse"
                      onClick={() => editExercise(id, 'forstaelse')}
                    />
                    <IconButton
                      className={classes.deletebutton}
                      onClick={() =>
                        onDeleteExercise(type, `/deleteforstaelse/${id}`)
                      }
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Grid>
                );
              }
              if (type.substring(0, 4) === 'rydd') {
                return (
                  <Grid key={index} item xs={6} className={classes.chipgrid}>
                    <Chip
                      className={classes.ryddchip}
                      label="Rydde Setninger"
                      onClick={() => editExercise(id, 'rydde_setninger')}
                    />
                    <IconButton
                      className={classes.deletebutton}
                      onClick={() =>
                        onDeleteExercise(type, `/delete_rydde_setninger/${id}`)
                      }
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Grid>
                );
              }
              return <div key={index} />;
            })}
          </Grid>
        </Grid>
        <Grid item sm={12} className={classes.errormessage}>
          <div>
            <ErrorMessage message={errorMessage} />
          </div>
        </Grid>
        <Grid item sm={12} className={classes.buttoncontainer}>
          <Grid>
            <Button
              className={classes.buttons}
              variant="outlined"
              onClick={() => setRedirectHome(true)}
            >
              Kanseller
            </Button>
          </Grid>
          <Grid>
            <Button
              className={classes.buttons}
              variant="contained"
              color="primary"
              onClick={() => onSubmitSet()}
            >
              Lagre
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {showModal && (
        <InfoModal showModal={showModal} setShowModal={setShowModal} />
      )}
      {redirectHome && (
        <Redirect
          to={{
            pathname: '/home',
          }}
        />
      )}
    </Paper>
  );
};

export default CreateExerciseMenu;
