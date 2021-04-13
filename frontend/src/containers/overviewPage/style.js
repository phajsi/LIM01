import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: 'auto',
  },
  infobox: {
    textlign: 'center',
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '50px',
  },
  buttons: {
    textlign: 'center',
    margin: 'auto',
  },
  makecomment: {
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    border: '2px solid #F5F5F5',
    borderRadius: 5,
  },
  commentfield: {
    maxWidth: 600,
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
