import React, { Fragment } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/layout/Layout';
import Typography from '@material-ui/core/Typography';
// import Skeleton from './components/skeleton/Skeleton';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/alert/Alert';
import Logout from './components/auth/Logout';
import Resources from './components/resources/Resources';
import Profile from './components/student/ProfileCard';
import AddResource from './components/resources/AddResources';
import EditProfile from './components/student/EditProfile';
function App({ isAuthenticated }) {
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
            <Route path='/' component={Resources} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
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

export default connect(mapStateToProps)(App);
