import axios from 'axios';
import * as actionTypes from './actionTypes';
import { showAlert, hideAlert } from './alertAction';

const saveLocal = (token, email, password) => {
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
};

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSuccess = (student, token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    student: student,
    token: token,
  };
};
export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL,
  };
};

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post('/api/v1/student/login', { email, password });
    dispatch(loginSuccess(res.data.student, res.data.token));
    saveLocal(res.data.token, email, password);
    dispatch(showAlert('login successful', 'success'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  } catch (error) {
    dispatch(loginFail());
    dispatch(showAlert(error.response.data.message, 'error'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  }
};

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};
export const signupSuccess = (student, token) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    student: student,
    token: token,
  };
};

export const signupFail = () => {
  return {
    type: actionTypes.SIGNUP_FAIL,
  };
};

export const signUp = ({
  name,
  email,
  department,
  semester,
  classRoll,
  batch,
  password,
  passwordConfirm,
  CR,
}) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const body = {
      name,
      email,
      department,
      semester,
      classRoll,
      batch,
      password,
      passwordConfirm,
      CR,
    };
    const res = await axios.post('/api/v1/student/signup', body);
    dispatch(signupSuccess(res.data.student, res.data.token));
    saveLocal(res.data.token, email, password);
    dispatch(showAlert('Signup Successfull', 'success'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  } catch (error) {
    dispatch(signupFail());
    console.log(error.response);
    dispatch(showAlert('signup fail', 'error'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  }
};

export const resetPassword = (body, token) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`/api/v1/student/resetPassword/${token}`, body);
    dispatch(loginSuccess(res.data.student, res.data.token));
    saveLocal(res.data.token, res.data.student.email, body.password);
    dispatch(showAlert('reset password successful', 'success'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  } catch (error) {
    dispatch(loginFail());
    dispatch(showAlert('Reset Password fail', 'error'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
