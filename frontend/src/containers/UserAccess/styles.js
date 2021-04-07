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
  secondaryButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    backgroundColor: 'gray',
    color: 'white',
  },
  headline: {
    textAlign: 'center',
  },
  divider: {
    margin: theme.spacing(3),
  },
}));

export default useStyles;
