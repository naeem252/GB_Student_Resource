import * as actionTypes from '../action/actionTypes';
const initialState = {
  isAuthenticated: false,
  student: null,
  loading: false,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_START:
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        student: action.student,
        loading: false,
      };
    case actionTypes.LOGIN_FAIL:
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        student: null,
        loading: false,
      };
    case actionTypes.AUTH_STUDENT_IMAGE_UPDATE:
      return {
        ...state,
        student: action.student,
      };
    default:
      return state;
  }
}
