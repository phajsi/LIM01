import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 1200,
    margin: 'auto',
  },
  text: {
    textlign: 'center',
    maxWidth: 800,
    margin: 'auto',
  },
  commentfield: {
    backgroundColor: '#F5F5F5',
    maxWidth: 800,
    margin: 'auto',
  },
  card: {
    marginBottom: '5px',
    marginTop: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    maxHeight: 60,
    alignSelf: 'flex-start',
  },
  form: {
    margin: 'auto',
  },
  formfields: {
    width: '100%',
    marginBottom: '10px',
    marginTop: '5px',
  },
});
export default useStyles;
