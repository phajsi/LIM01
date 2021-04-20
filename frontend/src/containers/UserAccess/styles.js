import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    maxHeight: '100vh',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  infoBox: {
    marginTop: theme.spacing(3),
    margin: 'auto',
    padding: theme.spacing(3),
    maxWidth: '60vh',
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  headline: {
    textAlign: 'center',
  },
  divider: {
    margin: theme.spacing(3),
  },
  card: {
    border: '3px solid lightgreen',
    textAlign: 'left',
  },
  cardHeader: {
    padding: '3px',
    textAlign: 'left',
  },
  message: {
    '& > p': {
      padding: 0,
      margin: 0,
    },
  },
  messageList: {
    '& > p': {
      padding: 0,
      margin: 0,
      textIndent: '1em',
      listStyleType: 'disc',
      display: 'list-item',
      listStylePosition: 'inside',
    },
  },
}));

export default useStyles;
