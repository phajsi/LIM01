import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: 30,
    marginBottom: 10,
    padding: 30,
    backgroundColor: 'antiquewhite',
  },
  image: {
    maxWidth: 150,
    marginBottom: 10,
    float: 'right',
  },
  text: {
    maxWidth: 600,
    marginBottom: 10,
    float: 'center',
    display: 'inline-block',
  },
});

export default useStyles;
