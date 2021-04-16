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
    maxWidth: theme.spacing(112),
    display: 'flex',
    flexDirection: 'row',
  },
  formfieldname: {
    textAlign: 'left',
    fontWeight: 'bold',
    minWidth: theme.spacing(9),
    paddingRight: theme.spacing(2),
    justifyContent: 'flex-start',
  },
  buttoncontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: theme.spacing(16),
    marginTop: theme.spacing(2),
  },
  buttons: {
    width: theme.spacing(15),
  },
  chipgrid: {
    minWidth: theme.spacing(25),
  },
  chip: {
    minWidth: theme.spacing(25),
    margin: theme.spacing(0.5),
  },
}));

export default useStyles;
