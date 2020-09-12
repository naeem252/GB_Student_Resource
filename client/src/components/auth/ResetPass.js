import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, Box, TextField, Button, Grid, Typography } from '@material-ui/core';
import BackDrop from '../backDrop/BackDrop';
import * as action from '../../action/authActions';

function ForgotPass({ loading, resetPassword, match }) {
  const [formData, setFormData] = useState({ password: '', passwordConfirm: '' });
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onResetHandler = (e) => {
    e.preventDefault();
    resetPassword(formData, match.params.token);
  };
  return (
    <Grid container justify='center'>
      <Grid item sm={6} xs={12}>
        {loading && <BackDrop open={loading} />}
        <Card>
          <CardContent>
            <Typography variant='h5'>Reset Password</Typography>
            <Box my={1}>
              <TextField
                label='Password'
                fullWidth
                type='password'
                value={formData.password}
                onChange={onChangeHandler}
                variant='outlined'
                helperText='password is required'
                name='password'
              />
            </Box>
            <Box my={1}>
              <TextField
                label='Password'
                fullWidth
                type='password'
                value={formData.passwordConfirm}
                onChange={onChangeHandler}
                variant='outlined'
                helperText='email is required'
                name='passwordConfirm'
              />
            </Box>
            <Box my={1}>
              <Button onClick={onResetHandler} fullWidth variant='contained' color='primary'>
                Reset
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (body, token) => dispatch(action.resetPassword(body, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
