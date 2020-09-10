import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../action/authActions';
import { getResources } from '../../action/resourcesAction';
import * as actionTypes from '../../action/actionTypes';
import axios from 'axios';
function Logout({ logOut, getResources, emptyNotice }) {
  // await axios.get('api/v1/student/logout');
  useEffect(() => {
    axios.get('/api/v1/student/logout').then(() => {
      logOut();
      emptyNotice();
      getResources();
    });
  }, [logOut]);
  return <Redirect to='/' />;
}
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logout()),
    getResources: () => dispatch(getResources()),
    emptyNotice: () => dispatch({ type: actionTypes.GET_NOTICE_FAIL }),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
