import React, { useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../action/authActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../spinner/Spinner';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BackDrop from '../backDrop/BackDrop';
import MyLink from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  card: {
    width: '100%',
  },
}));

function Login({ login, auth: { loading, isAuthenticated } }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const onchangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/resources' />;
  }

  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <form onSubmit={(e) => onSubmitHandler(e)} action=''>
        <Grid container justify='center'>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>Login</Typography>
                <Box my={4}>
                  <TextField
                    fullWidth
                    id='outlined-helperText'
                    name='email'
                    value={email}
                    onChange={(e) => onchangeHandler(e)}
                    label='Email'
                    helperText=''
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => onchangeHandler(e)}
                    label='Password'
                    helperText=''
                    variant='outlined'
                  />
                </Box>

                <Button type='submit' variant='contained' color='primary' fullWidth>
                  Login
                </Button>
                <Box my={2}>
                  <Link to='/forgot-password'>
                    <MyLink>Forgot Password?</MyLink>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(actions.login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
