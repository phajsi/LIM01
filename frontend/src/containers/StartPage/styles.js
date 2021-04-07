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
  title: {
    flexGrow: 1,
    color: '#367051',
    fontWeight: '600',
    float: 'right',
    margin: theme.spacing(1),
    textDecoration: 'none',
  },
  right: {
    flex: 1,
  },
  logoBox: {
    lineHeight: '200px',
    justifyContent: 'center',
  },
  logoImg: {
    verticalAlign: 'middle',
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
  },
  searchBox: {
    margin: 'auto',
    width: '40vw',
  },
  search: {
    backgroundColor: 'white',
    border: '2px solid #0F6D5F',
    boxSizing: 'border-box',
    borderRadius: '5px',
    margin: theme.spacing(4),
  },
  btn: {
    backgroundColor: '#F7B733',
    color: 'black',
    fontWeight: 'bold',
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15))',
  },
  ellipse: {
    width: '20vw',
    display: 'block',
    position: 'absolute',
    top: '0',
  },
  tree: {
    width: '16vw',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    right: '10vw',
  },
  forest: {
    width: '28vw',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '12vw',
  },
}));
export default useStyles;
