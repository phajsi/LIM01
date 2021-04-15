import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    maxWidth: theme.spacing(150),
    margin: 'auto',
    textAlign: 'center',
    border: '1px solid #000000',
    borderRadius: 5,
    padding: '5vw',
  },
  gridcontainer: {
    margin: 'auto',
  },
  menu: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  menugroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  menuitem: {
    maxWidth: theme.spacing(50),
    border: '2px solid #000000',
    borderRadius: 10,
    margin: '5px',
    padding: '15px',
    justifyContent: 'center',
    flexGrow: 1,
  },
  icons: {
    fontSize: '1.5em',
    justifyContent: 'flex-end',
  },
  form: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    maxWidth: theme.spacing(100),
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: theme.spacing(17),
    marginTop: theme.spacing(2),
  },
  buttons: {
    width: theme.spacing(15),
  },
  chip: {
    minWidth: theme.spacing(25),
    margin: theme.spacing(0.5),
  },
}));

export default useStyles;
