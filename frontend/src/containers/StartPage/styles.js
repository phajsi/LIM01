import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    height: '100vh',
  },
  navbar: {
    backgroundColor: 'transparent',
    elevation: 'none',
  },
  searchBar: {
    margin: 'auto',
    maxWidth: '40vw',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '60vw',
    },
  },
  title: {
    flexGrow: 1,
    color: '#367051',
    fontWeight: '600',
    float: 'right',
    padding: theme.spacing(1),
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#47956A',
      color: 'white',
      borderRadius: '15px',
    },
  },
  right: {
    flex: 1,
  },
  logoBox: {
    lineHeight: '200px',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '15vh',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  logoImg: {
    verticalAlign: 'middle',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '70%',
    },
  },
  logoText: {
    display: 'inline-block',
    border: '3px solid #0F6D5F',
    boxSizing: 'border-box',
    fontFamily: 'Roboto',
    fontWeight: '200',
    color: '#0F6D5F',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      maxWidth: '70%',
    },
  },
  ellipse: {
    display: 'block',
    position: 'absolute',
    top: '0',
    [theme.breakpoints.up('xs')]: {
      maxWidth: '20vw',
    },
    [theme.breakpoints.down('xs')]: {
      top: '0',
      maxWidth: '40vw',
    },
  },
  tree: {
    display: 'block',
    position: 'absolute',
    bottom: '0',
    right: '10vw',
    [theme.breakpoints.up('xs')]: {
      maxWidth: '16vw',
    },
    [theme.breakpoints.down('xs')]: {
      right: '5vw',
      maxWidth: '30vw',
    },
  },
  forest: {
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '12vw',
    [theme.breakpoints.up('xs')]: {
      maxWidth: '28vw',
    },
    [theme.breakpoints.down('xs')]: {
      left: '5vw',
      maxWidth: '60vw',
    },
  },
}));
export default useStyles;
