import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from './action/authActions';
import Layout from './components/layout/Layout';
import Typography from '@material-ui/core/Typography';
// import Skeleton from './components/skeleton/Skeleton';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/alert/Alert';
import Logout from './components/auth/Logout';
import Resources from './components/resources/Resources';
import Profile from './components/student/Student';
import AddResource from './components/resources/AddResources';
import EditProfile from './components/student/EditProfile';
import Notice from './components/notices/Notices';
import AddNotice from './components/notices/AddNotice';
import Forgot from './components/auth/ForgotPass';
import ResetPass from './components/auth/ResetPass';
function App({ isAuthenticated, login }) {
  //try to auto login
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('password')) {
      login(localStorage.getItem('email'), localStorage.getItem('password'));
    }
  }, [login]);
  return (
    <Fragment>
      <Layout>
        <Alert />
        {isAuthenticated ? (
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/logout' component={Logout} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/edit-profile' component={EditProfile} />
            <Route path='/resources' component={Resources} />
            <Route path='/add-resources' component={AddResource} />
            <Route path='/notice' component={Notice} />
            <Route path='/add-notice' component={AddNotice} />
            <Route path='/' component={Resources} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/forgot-password' component={Forgot} />
            <Route path='/resetPassword/:token' component={ResetPass} />
            <Route path='/*' component={Login} />
          </Switch>
        )}
      </Layout>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    showAlert: state.alert.showAlert,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(action.login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
