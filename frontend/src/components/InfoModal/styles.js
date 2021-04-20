import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    maxWidth: theme.spacing(150),
    margin: 'auto',
    textAlign: 'center',
    border: '1px solid #000000',
    borderRadius: 5,
  },
  header: {
    textAlign: 'center',
  },
  image: {
    maxWidth: theme.spacing(62),
    [theme.breakpoints.down('xs')]: {
      maxWidth: '80vw',
    },
  },
}));

export default useStyles;
