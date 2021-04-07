import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  infoBox: {
    padding: theme.spacing(2),
  },
  searchTitle: {
    margin: 'auto',
  },
  searchBox: {
    margin: 'auto',
    color: '#FFFAF0',
    width: '40vw',
  },
  search: {
    backgroundColor: 'white',
    opacity: '0.8',
    border: '2px solid #0F6D5F',
    boxSizing: 'border-box',
    borderRadius: '5px',
  },
  btn: {
    backgroundColor: '#F7B733',
    color: 'black',
    fontWeight: 'bold',
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15))',
  },
}));
export default useStyles;
