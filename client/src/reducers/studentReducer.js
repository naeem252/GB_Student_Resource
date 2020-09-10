import * as actionTypes from '../action/actionTypes';
const initialState = {
  student: null,
  loading: false,
  studentUploadedResources: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_STUDENT_START:
    case actionTypes.UPDATE_STUDENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_STUDENT_SUCCESS:
    case actionTypes.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.student,
        studentUploadedResources: action.studentResources,
      };
    case actionTypes.GET_STUDENT_FAIL:
    case actionTypes.UPDATE_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        student: null,
      };

    default:
      return state;
  }
}
