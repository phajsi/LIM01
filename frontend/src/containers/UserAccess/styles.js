import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  infoBox: {
    marginTop: theme.spacing(3),
    margin: 'auto',
    padding: theme.spacing(3),
    width: '60vh',
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
}));

export default useStyles;
