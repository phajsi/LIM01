import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: 30,
    background: 'antiquewhite',
    padding: 30,
  },
  image: {
    maxWidth: 300,
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
