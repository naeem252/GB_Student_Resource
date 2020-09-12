import * as actionTypes from './actionTypes';
import { showAlert, hideAlert } from './alertAction';
import axios from 'axios';

const getStudentStart = () => {
  return {
    type: actionTypes.GET_STUDENT_START,
  };
};
const getStudentSuccess = (student, studentResources) => {
  return {
    type: actionTypes.GET_STUDENT_SUCCESS,
    student: student,
    studentResources: studentResources,
  };
};

const getStudentFail = () => {
  return {
    type: actionTypes.GET_STUDENT_FAIL,
  };
};

export const getStudent = (id) => async (dispatch) => {
  dispatch(getStudentStart());
  try {
    const res = await axios.get(`/api/v1/student/${id}`);
    const res2 = await axios.get(`/api/v1/resource/studentResources/${id}`);
    dispatch(getStudentSuccess(res.data.student, res2.data.studentUploadedResources));
  } catch (error) {
    dispatch(getStudentFail());
  }
};

const authStudentImageUpdate = (student) => {
  return {
    type: actionTypes.AUTH_STUDENT_IMAGE_UPDATE,
    student: student,
  };
};

export const updateStudentImage = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/student/${id}`);
    const res2 = await axios.get(`/api/v1/resource/studentResources/${id}`);
    dispatch(getStudentSuccess(res.data.student, res2.data.studentUploadedResources));
    dispatch(authStudentImageUpdate(res.data.student));
  } catch (error) {
    dispatch(getStudentFail());
  }
};

const updateStudentStart = () => {
  return {
    type: actionTypes.UPDATE_STUDENT_START,
  };
};
const updateStudentSuccess = (student, studentResources) => {
  return {
    type: actionTypes.UPDATE_STUDENT_SUCCESS,
    student: student,
    studentResources: studentResources,
  };
};
const updateStudentFail = () => {
  return {
    type: actionTypes.UPDATE_STUDENT_FAIL,
  };
};

export const updateStudent = (body, id, history) => async (dispatch) => {
  dispatch(updateStudentStart());
  try {
    const res = await axios.patch(`/api/v1/student/updateMe`, body);
    const res2 = await axios.get(`/api/v1/resource/studentResources/${id}`);
    dispatch(updateStudentSuccess(res.data.student, res2.data.studentUploadedResources));
    dispatch(showAlert('Profile Updated Successfully', 'success'));
    dispatch({ type: actionTypes.AUTH_STUDENT_DATA_UPDATE, student: res.data.student });
    history.push(`/profile/${id}`);
    window.setTimeout(() => dispatch(hideAlert('Profile Update fail', 'error')));
  } catch (error) {
    dispatch(updateStudentFail());
    dispatch(showAlert('Profile Updated Successfully', 'success'));
    window.setTimeout(() => dispatch(hideAlert('Profile Update fail', 'error')));
  }
};
