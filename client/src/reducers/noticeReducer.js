import * as actionTypes from '../action/actionTypes';

const initialState = {
  notices: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_NOTICE_START:
    case actionTypes.POST_NOTICE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        notices: action.notices,
      };
    case actionTypes.GET_NOTICE_FAIL:
    case actionTypes.POST_NOTICE_FAIL:
      return {
        ...state,
        loading: false,
        notices: [],
      };
    case actionTypes.POST_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
