import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    maxWidth: theme.spacing(80),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  form: {
    width: '70%',
    margin: theme.spacing(3),
  },
  paper: {
    backgroundColor: '#f5f5f5',
    maxWidth: theme.spacing(40),
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
  layout: {
    backgroundColor: '#f5f5f5',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  text: {
    margin: theme.spacing(0),
  },
  gridText: {
    paddingBottom: theme.spacing(0),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  navbar: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
  },
  answerBtn: {
    backgroundColor: 'white',
    marginRight: theme.spacing(1),
  },
  addIcon: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  innerMargin: {
    margin: theme.spacing(1),
  },
  icons: {
    fontSize: '1.5em',
    justifyContent: 'flex-end',
    '> *': {
      padding: 0,
    },
  },
  infoiconButton: {
    '&.MuiIconButton-colorSecondary:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  headergroup: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
  },
}));

export default useStyles;
