import React, { useEffect, useRef, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../action/studentAction';
import imageSpinner from '../../images/imageSpinner.gif';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import BackDrop from '../backDrop/BackDrop';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100px',
    height: '100px',
  },
  type: {
    alignSelf: 'start',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  myLink: { display: 'block' },
  myBox: { width: '100%' },
  input: { display: 'none' },
  label: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#ddd',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    position: 'relative',
    left: '50px',
    top: '-35px',
  },
}));

function Student({
  student,
  getStudent,
  loading,
  authId,
  studentUploadedResources,
  updateStudentImage,
  match: {
    params: { id },
  },
}) {
  const classes = useStyles();
  const [imageChanging, changeImageState] = useState(false);
  useEffect(() => {
    if (!student || student._id != id) {
      getStudent(id);
    }
  }, [student, getStudent]);

  const imageInput = useRef(null);
  const onImageSubmitHandler = async (e) => {
    e.preventDefault();
    if (!imageInput.current.files[0]) {
      return;
    }
    changeImageState(true);
    const form = new FormData();
    form.append('image', imageInput.current.files[0]);
    const res = await axios.patch('/api/v1/student/upload-student-image', form);
    updateStudentImage(authId);

    window.setTimeout(() => changeImageState(false), 2000);
  };

  return (
    <Grid container justify='center'>
      <Grid item sm={6} xs={12} justify='center'>
        <Card>
          {loading || student === null ? (
            <BackDrop open={loading} />
          ) : (
            <CardContent className={classes.cardContent}>
              {imageChanging ? (
                <Avatar className={classes.avatar} src={imageSpinner} />
              ) : (
                <Avatar className={classes.avatar} src={`/images/studentImages/${student.image}`} />
              )}
              {student._id === authId && (
                <Fragment>
                  <label className={classes.label} htmlFor='image'>
                    <span className='edit-icon' title='edit image'>
                      <i className='fas fa-pencil-alt'></i>
                    </span>
                  </label>
                  <form>
                    <input
                      className={classes.input}
                      ref={imageInput}
                      type='file'
                      id='image'
                      name='image'
                      onChange={(e) => onImageSubmitHandler(e)}
                    />
                  </form>
                </Fragment>
              )}
              <Typography variant='h4'>{student.name}</Typography>
              <Typography className={classes.type}>
                <strong>Department:</strong>
                {student.department}
              </Typography>
              <Typography className={classes.type}>
                <strong>Semester:</strong>
                {student.semester}
              </Typography>
              <Typography className={classes.type}>
                <strong>Batch:</strong>
                {student.batch}
              </Typography>
              <Typography className={classes.type}>
                <strong>Class Roll:</strong>
                {student.classRoll}
              </Typography>
              <Typography className={classes.type}>
                <strong>Resource Shared:</strong>
                {studentUploadedResources && studentUploadedResources.length}
              </Typography>
              {student._id === authId && (
                <Box className={classes.myBox} my={2}>
                  <Link className={classes.myLink} to='/edit-profile'>
                    <Button variant='contained' color='primary' fullWidth>
                      Edit Profile
                    </Button>
                  </Link>
                </Box>
              )}
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    student: state.student.student,
    loading: state.student.loading,
    authId: state.auth.student._id,
    studentUploadedResources: state.student.studentUploadedResources,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (id) => dispatch(actions.getStudent(id)),
    updateStudentImage: (id) => dispatch(actions.updateStudentImage(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Student);
