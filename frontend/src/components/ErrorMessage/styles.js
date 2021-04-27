import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    border: '3px solid lightcoral',
    textAlign: 'left',
  },
  cardHeader: {
    padding: '3px',
    textAlign: 'left',
  },
  icon: {
    color: 'lightcoral',
  },
}));

export default useStyles;
