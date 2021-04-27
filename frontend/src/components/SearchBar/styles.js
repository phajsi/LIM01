import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  searchBox: {
    margin: 'auto',
  },
  search: {
    backgroundColor: 'white',
    opacity: '0.8',
    border: '2px solid #0F6D5F',
    boxSizing: 'border-box',
    borderRadius: '5px',
  },
  btn: {
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.15))',
  },
  card: {
    border: '3px solid lightcoral',
    textAlign: 'left',
  },
  cardHeader: {
    padding: '3px',
    textAlign: 'left',
  },
}));
export default useStyles;
