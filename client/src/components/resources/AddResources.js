import React, { useState, Fragment, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BackDrop from '../backDrop/BackDrop';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import IconButton from '@material-ui/core/IconButton';
import * as action from '../../action/resourcesAction';
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
  input: {
    display: 'none',
  },
}));

function AddResources({ createResource, resources: { loading }, student, authStudent }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    department: authStudent.department,
    semester: authStudent.semester,
    courseCode: '',
    pdf: '',
  });
  const [selectFieldName, setSelectFieldName] = useState('Select PDF');
  const { department, semester, courseCode, pdf } = formData;
  const onchangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const pdfFile = useRef(null);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let stdId = null;
    if (student) {
      stdId = student._id;
    }
    const myFormData = new FormData();
    myFormData.append('department', department);
    myFormData.append('courseCode', courseCode);
    myFormData.append('pdf', pdfFile.current.files[0]);
    myFormData.append('semester', semester);
    createResource(myFormData, stdId);
  };

  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <form onSubmit={(e) => onSubmitHandler(e)} encType='multipart/form-data'>
        <Grid container justify='center'>
          <Grid item sm={6} xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>Upload Resource</Typography>
                <Box my={4}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    fullWidth
                    name='department'
                    value={department}
                    onChange={(e) => onchangeHandler(e)}
                    label='Department'
                    helperText=''
                    variant='outlined'
                    defaultValue={department}
                  >
                    {[...data.department].map((option, index) => {
                      if (index === 0) {
                        return;
                      }
                      return (
                        <MenuItem selected={index === 1} key={option.value} value={option.value}>
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
                    name='semester'
                    value={semester}
                    onChange={(e) => onchangeHandler(e)}
                    label='Semester'
                    helperText=''
                    variant='outlined'
                    defaultValue={semester}
                  >
                    {[...data.semester].map((option, index) => {
                      if (index === 0) {
                        return;
                      }
                      return (
                        <MenuItem selected={index === 1} key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Box>
                <Box mb={4}>
                  <TextField
                    fullWidth
                    name='courseCode'
                    type='text'
                    value={courseCode}
                    onChange={(e) => onchangeHandler(e)}
                    label='Course Code'
                    helperText=''
                    variant='outlined'
                  />
                </Box>

                <Box mb={4}>
                  <input
                    onChange={(e) => setSelectFieldName(pdfFile.current.files[0].name)}
                    ref={pdfFile}
                    className={classes.input}
                    id='icon-button-file'
                    type='file'
                  />
                  <label htmlFor='icon-button-file'>
                    <IconButton aria-label='upload picture' component='span'>
                      <PictureAsPdfSharpIcon /> {selectFieldName}
                    </IconButton>
                  </label>
                </Box>

                <Button type='submit' variant='contained' color='primary' fullWidth>
                  <CloudUploadIcon /> Upload
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
    resources: state.resources,
    student: state.student.student,
    authStudent: state.auth.student,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createResource: (body, stdId) => dispatch(action.createResource(body, stdId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddResources);
