import * as actionTypes from './actionTypes';
import axios from 'axios';

const getNoticesStart = () => {
  return {
    type: actionTypes.GET_NOTICE_START,
  };
};

const getNoticesSuccess = (notices) => {
  return {
    type: actionTypes.GET_NOTICE_SUCCESS,
    notices: notices,
  };
};
const getNoticesFail = () => {
  return {
    type: actionTypes.GET_NOTICE_FAIL,
  };
};

export const getNotices = () => async (dispatch) => {
  dispatch(getNoticesStart());
  try {
    const res = await axios.get('/api/v1/notice/all-notice');
    dispatch(getNoticesSuccess(res.data.notices));
  } catch (error) {
    console.log(error.response);
    dispatch(getNoticesFail());
  }
};

const postNoticeStart = () => {
  return {
    type: actionTypes.POST_NOTICE_START,
  };
};

const postNoticeSuccess = () => {
  return {
    type: actionTypes.POST_NOTICE_SUCCESS,
  };
};
const postNoticeFail = () => {
  return {
    type: actionTypes.POST_NOTICE_FAIL,
  };
};

export const postNotice = (body) => async (dispatch) => {
  dispatch(postNoticeStart());
  try {
    const res = await axios.post('/api/v1/notice/', body);
    dispatch(postNoticeSuccess());
    dispatch(getNotices());
  } catch (error) {
    console.log(error.response);
    dispatch(postNoticeFail());
  }
};
