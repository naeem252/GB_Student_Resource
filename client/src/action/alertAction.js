import * as actionTypes from './actionTypes';

export const showAlert = (message, type) => {
  return {
    type: actionTypes.SHOW_ALERT,
    message: message,
    alertType: type,
  };
};

export const hideAlert = () => {
  return {
    type: actionTypes.HIDE_ALERT,
  };
};
