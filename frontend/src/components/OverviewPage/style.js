import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(100),
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
  },
  triangle1: {
    top: 0,
    left: 0,
    maxWidth: '100vw',
    position: 'absolute',
    marginBottom: theme.spacing(2),
    zIndex: -1,
  },
  triangle2: {
    bottom: 0,
    right: 0,
    display: 'block',
    maxWidth: '100vw',
    position: 'absolute',
    marginTop: theme.spacing(2),
    zIndex: -1,
  },
  container: {
    padding: theme.spacing(2),
  },
  infobox: {
    textlign: 'center',
    maxWidth: theme.spacing(75),
    margin: '50px auto 50px auto',
    borderRadius: '15px',
  },
  centertext: {
    margin: 'auto 0 auto 0',
  },
  description: {
    textAlign: 'justify',
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.spacing(7.5),
      margin: '10px 0 0 0',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '50px',
    margin: 'auto 0 auto 0',
    justifyContent: 'center',
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  buttongrid: {
    textAlign: 'center',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      marginTop: '30px',
    },
  },
  buttons: {
    textlign: 'center',
    margin: 'auto',
    height: '100px',
    borderRadius: '50px',
  },
  listcontainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  completedtext: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: theme.spacing(75),
    margin: 'auto',
  },
  makecomment: {
    maxWidth: theme.spacing(75),
    margin: '0 auto 0 auto',
  },
  defaulttext: {
    maxWidth: theme.spacing(75),
    margin: '15px auto 0 auto',
    padding: '10px',
    textAlign: 'center',
    border: '2px solid #F5F5F5',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  commentheader: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: theme.spacing(75),
    maxHeight: theme.spacing(5),
    marginTop: theme.spacing(1),
    margin: 'auto',
  },
  rating: {
    margin: 'auto 0 auto 10px',
  },
  commentfield: {
    maxWidth: theme.spacing(75),
    margin: 'auto',
    padding: theme.spacing(1.5),
  },
  card: {
    margin: '5px auto 10px auto',
  },
  cardcontent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  cardauthor: {
    minHeight: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    backgroundColor: '#85aeed',
    textAlign: 'center',
  },
  textgrid: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
  },
  cardtext: {
    wordBreak: 'break-word',
  },
  homeIconbutton: {
    height: '50px',
    margin: 'auto 0 auto 0',
    borderRadius: '15px',
  },
  iconbutton: {
    height: '50px',
    margin: 'auto 0 auto 0',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  formfields: {
    width: '100%',
    marginBottom: '10px',
    marginTop: '5px',
    backgroundColor: 'white',
  },
}));
export default useStyles;
