import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
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
    padding: theme.spacing(2),
  },
  navbar: {
    backgroundColor: 'white',
    color: 'black',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardcontent: {
    display: 'flex',
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
  },
  audiotext: {
    margin: 'auto 0 auto 0',
  },
  chosenWords: {
    padding: theme.spacing(1),
    minHeight: '2.5em',
    backgroundColor: 'white',
    borderRadius: '11px',
    boxShadow: 'inset 0px 1px 6px rgba(147, 145, 145, 0.48)',
  },
  wordBtn: {
    textTransform: 'none',
  },
  progresscontainer: {
    margin: theme.spacing(1),
  },
}));

export default useStyles;
