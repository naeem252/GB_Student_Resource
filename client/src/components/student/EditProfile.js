import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../action/studentAction';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BackDrop from '../backDrop/BackDrop';
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

function EditProfile({ loading, authStudent, updateStudent, isAuthenticated, ...props }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: authStudent.name,
    department: authStudent.department,
    batch: authStudent.batch,
    semester: authStudent.semester,
    classRoll: authStudent.classRoll,
  });

  const { name, department, batch, semester, classRoll } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    updateStudent(formData, authStudent._id, props.history);
  };
  // console.log(props);
  if (!isAuthenticated) {
    return props.history.push('/login');
  }

  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <form onSubmit={(e) => onSubmitHandler(e)} encType='multipart/form-data'>
        <Grid container justify='center'>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>Edit Profile</Typography>
                <Box my={4}>
                  <TextField
                    fullWidth
                    id='outlined-helperText'
                    name='name'
                    value={name}
                    onChange={(e) => onChangeHandler(e)}
                    label='Name'
                    helperText=''
                    variant='outlined'
                  />
                </Box>
                <Box my={4}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    fullWidth
                    name='department'
                    value={department}
                    onChange={(e) => onChangeHandler(e)}
                    label='Department'
                    helperText=''
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
                <Box my={4}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    fullWidth
                    name='semester'
                    value={semester}
                    onChange={(e) => onChangeHandler(e)}
                    label='Semester'
                    helperText=''
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
                <Box my={4}>
                  <TextField
                    fullWidth
                    id='outlined-helperText'
                    name='batch'
                    value={batch}
                    onChange={(e) => onChangeHandler(e)}
                    label='Batch'
                    helperText=''
                    variant='outlined'
                    type='number'
                    min='1'
                  />
                </Box>
                <Box my={4}>
                  <TextField
                    fullWidth
                    id='outlined-helperText'
                    name='classRoll'
                    value={classRoll}
                    onChange={(e) => onChangeHandler(e)}
                    label='Class Roll'
                    helperText=''
                    variant='outlined'
                    type='number'
                    min='1'
                  />
                </Box>

                <Button type='submit' variant='contained' color='primary' fullWidth>
                  Update
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
    isAuthenticated: state.auth.isAuthenticated,
    authStudent: state.auth.student,
    loading: state.student.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (body, stdId, history) => dispatch(action.updateStudent(body, stdId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
