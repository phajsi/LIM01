import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(100),
    margin: 'auto',
    marginTop: theme.spacing(3),
    background: 'white',
    padding: theme.spacing(2),
  },
  happyImage: {
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      maxHeight: '50vh',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '40vw',
    },
  },
  sadImage: {
    maxHeight: '50vh',
    float: 'right',
  },
  text: {
    maxWidth: theme.spacing(78),
    marginBottom: theme.spacing(1),
    float: 'center',
    display: 'inline-block',
  },
  like: {
    color: 'orange',
  },
  dislike: {
    color: 'blue',
  },
}));

export default useStyles;
