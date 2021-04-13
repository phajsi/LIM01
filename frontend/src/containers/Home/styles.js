import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    padding: theme.spacing(3),
    fontFamily: 'roboto, helvetica, arial, sansSerif',
  },
  searchTitle: {
    margin: 'auto',
  },
}));
export default useStyles;
