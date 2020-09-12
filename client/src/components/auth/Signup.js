import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as data from '../../util/data';
import MenuItem from '@material-ui/core/MenuItem';
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

function Signup({ signUp, auth: { loading, isAuthenticated } }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    department: '',
    classRoll: '',
    batch: '',
    semester: '',
    CR: 'false',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
    department: false,
    semester: false,
    classRoll: false,
    batch: false,
  });
  const { name, email, password, passwordConfirm, department, semester, batch, classRoll, CR } = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const checkField = (field) => {
    return formData[field] === '';
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let hasError = false;

    Object.keys(formData).map((field) => {
      if (checkField(field)) {
        errors[field] = true;
      } else {
        errors[field] = false;
      }
    });

    if (hasError) {
      return;
    }

    formData.CR = formData.CR === 'false' ? false : true;
    signUp({ ...formData });
  };

  if (isAuthenticated) {
    return <Redirect to='/resources' />;
  }
  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <form action='' className='form signup' onSubmit={(e) => onSubmitHandler(e)}>
        <Grid container justify='center'>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>Sign Up</Typography>
                <Box my={4}>
                  <TextField
                    fullWidth
                    error={errors.name}
                    id='outlined-helperText'
                    name='name'
                    value={name}
                    onChange={(e) => onChangeHandler(e)}
                    label='Name'
                    helperText={errors.name && 'Please Insert a name'}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    error={errors.email}
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => onChangeHandler(e)}
                    label='Email'
                    helperText={errors.email && 'Invalid Email Address'}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    fullWidth
                    error={errors.department}
                    name='department'
                    value={department}
                    onChange={(e) => onChangeHandler(e)}
                    label='Department'
                    helperText={errors.department && 'What is Your Department !'}
                    variant='outlined'
                  >
                    {data.department.map((option, index) => {
                      if (index === 0) {
                        return;
                      }
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Box>
                <Box mb={4}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    fullWidth
                    error={errors.semester}
                    name='semester'
                    value={semester}
                    onChange={(e) => onChangeHandler(e)}
                    label='Semester'
                    helperText={errors.semester && 'Semester field is Required'}
                    variant='outlined'
                  >
                    {[...data.semester].map((option, index) => {
                      if (index === 0) {
                        return;
                      }
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    error={errors.classRoll}
                    name='classRoll'
                    type='number'
                    value={classRoll}
                    onChange={(e) => onChangeHandler(e)}
                    label='Class Roll'
                    helperText={errors.classRoll && 'Class Roll field is required'}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    error={errors.batch}
                    name='batch'
                    type='number'
                    min='1'
                    value={batch}
                    onChange={(e) => onChangeHandler(e)}
                    label='Batch'
                    helperText={errors.batch && 'Batch field is required'}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    error={errors.password}
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => onChangeHandler(e)}
                    label='Password'
                    helperText={
                      errors.password ? 'password must be 8 or more character' : 'password must be 8 or more character'
                    }
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    error={errors.passwordConfirm}
                    name='passwordConfirm'
                    type='password'
                    value={passwordConfirm}
                    onChange={(e) => onChangeHandler(e)}
                    label='Confirm Password'
                    helperText={errors.passwordConfirm && 'Please confirm password'}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Are You CR?</FormLabel>
                    <RadioGroup
                      aria-label='CR'
                      name='CR'
                      value={CR}
                      onChange={(e) => setFormData({ ...formData, CR: e.target.value })}
                    >
                      <FormControlLabel value='true' control={<Radio />} label='Yes' />
                      <FormControlLabel value='false' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Button type='submit' variant='contained' color='primary' fullWidth>
                  Sign up
                </Button>
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
    signUp: ({ name, email, password, department, semester, batch, classRoll, CR, passwordConfirm }) =>
      dispatch(actions.signUp({ name, email, password, department, classRoll, batch, semester, CR, passwordConfirm })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
