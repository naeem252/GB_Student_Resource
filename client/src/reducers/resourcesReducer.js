import * as actionTypes from '../action/actionTypes';
const initialState = {
  resources: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_RESOURCES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_RESOURCES_SUCCESS:
      return {
        ...state,
        resources: action.resources,
        loading: false,
      };
    case actionTypes.GET_RESOURCES_FAIL:
      return {
        ...state,
        loading: false,
        resources: [],
      };
    case actionTypes.CREATE_RESOURCE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.CREATE_RESOURCE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.INCREMENT_DOWNLOAD:
      return {
        ...state,
        resources: state.resources.map((resource) => {
          if (resource._id.toString() === action.id.toString()) {
            return {
              ...resource,
              download: resource.download + 1,
            };
          }
          return {
            ...resource,
          };
        }),
      };
    default:
      return state;
  }
}
