import * as actionTypes from '../action/actionTypes';

const initialState = {
  showAlert: true,
  message: '',
  type: 'success',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        message: action.message,
        type: action.alertType,
      };
    case actionTypes.HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        message: '',
      };
    default:
      return state;
  }
}
