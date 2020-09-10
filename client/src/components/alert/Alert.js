import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function MyAlert({ message, type }) {
  const style = {
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: `translateX(-50%) ${type && message ? 'translateY(0)' : 'translateY(-105%)'}`,
    zIndex: 10000,
    transition: '0.4s',
  };
  const classes = useStyles();

  return (
    <div style={style}>
      <div className={classes.root}>
        <Alert severity={type}>
          <AlertTitle>{type}</AlertTitle>
          {message}
        </Alert>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    message: state.alert.message,
    type: state.alert.type,
  };
};
export default connect(mapStateToProps)(MyAlert);
