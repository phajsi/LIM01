import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    fontWeight: '600',
    margin: theme.spacing(0),
  },
  gridText: {
    paddingBottom: theme.spacing(0),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    float: 'right',
  },
  explanation: {
    margin: 'auto',
  },
}));

export default useStyles;
