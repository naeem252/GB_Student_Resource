import * as actionTypes from './actionTypes';
import { showAlert, hideAlert } from './alertAction';
import axios from 'axios';
import { getStudent } from './studentAction';

const getResourcesStart = () => {
  return {
    type: actionTypes.GET_RESOURCES_START,
  };
};
const getResourcesSuccess = (resources) => {
  return {
    type: actionTypes.GET_RESOURCES_SUCCESS,
    resources: resources,
  };
};
const getResourcesFail = () => {
  return {
    type: actionTypes.GET_RESOURCES_FAIL,
  };
};

export const getResources = () => async (dispatch) => {
  dispatch(getResourcesStart());
  try {
    const res = await axios.get('/api/v1/resource');
    dispatch(getResourcesSuccess(res.data.resources));
  } catch (error) {
    dispatch(getResourcesFail());
  }
};

const createResourceStart = () => {
  return {
    type: actionTypes.CREATE_RESOURCE_START,
  };
};
const createResourceSuccess = () => {
  return {
    type: actionTypes.CREATE_RESOURCE_SUCCESS,
  };
};
const createResourceFail = () => {
  return {
    type: actionTypes.CREATE_RESOURCE_FAIL,
  };
};

export const createResource = (body, stdId) => async (dispatch) => {
  dispatch(createResourceStart());
  try {
    const res = await axios.post('/api/v1/resource', body);
    dispatch(createResourceSuccess());
    dispatch(getResources());
    console.log(stdId);
    if (stdId) {
      dispatch(getStudent(stdId));
    }
    dispatch(showAlert('resource added successfully', 'success'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  } catch (error) {
    dispatch(createResourceFail());
    dispatch(showAlert(error.response.data.message, 'error'));
    window.setTimeout(() => dispatch(hideAlert()), 3000);
  }
};

export const incrementDownload = (id) => {
  return {
    type: actionTypes.INCREMENT_DOWNLOAD,
    id: id,
  };
};
