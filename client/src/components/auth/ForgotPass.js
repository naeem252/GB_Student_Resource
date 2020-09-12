import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Box, TextField, Button, Grid, Typography, Slide } from '@material-ui/core';
import BackDrop from '../backDrop/BackDrop';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

function ForgotPass() {
  const [email, setEmail] = useState('');
  const [loading, setLoadin] = useState(false);
  const [alert, setAlert] = useState({
    isShow: false,
    message: '',
    type: 'success',
  });
  const onForgotHandler = async (e) => {
    e.preventDefault();
    setLoadin(true);
    try {
      const res = await axios.post('/api/v1/student/forgot-password', { email });
      setAlert({
        ...alert,
        isShow: true,
        message: res.data.message,
        type: 'success',
      });
      setLoadin(false);
      window.setTimeout(
        () =>
          setAlert({
            ...alert,
            isShow: false,
          }),
        5000
      );
    } catch (error) {
      setAlert({
        ...alert,
        isShow: true,
        message: error.response.data.message,
        type: 'error',
      });
      setLoadin(false);
      window.setTimeout(
        () =>
          window.setTimeout(
            () =>
              setAlert({
                ...alert,
                isShow: false,
              }),
            5000
          ),
        5000
      );
    }
  };
  return (
    <Grid container justify='center'>
      <Grid item sm={6} xs={12}>
        {alert.isShow && <Alert severity={alert.type}>{alert.message}</Alert>}
        {loading && <BackDrop open={loading} />}
        <Card>
          <CardContent>
            <Typography variant='h5'>Forgot Password</Typography>
            <form>
              <Box my={1}>
                <TextField
                  label='Email'
                  fullWidth
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant='outlined'
                  helperText='email is required'
                />
              </Box>
              <Box my={1}>
                <Button type='submit' onClick={onForgotHandler} fullWidth variant='contained' color='primary'>
                  Send
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    forgot: (email) => dispatch({ type: 'forgot', emal: email }),
  };
};
export default connect(null, mapDispatchToProps)(ForgotPass);
