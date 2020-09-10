import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../images/gb_logo.png';

function Navigation({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <nav className='navigation'>
        <div className='container'>
          <NavLink to='/' className='logo'>
            <img src={logo} alt='logo' className='logo-image' />
          </NavLink>
          <ul className='navigation-nav'>
            <li>
              <NavLink to='/resources'>Resources</NavLink>
            </li>
            <li>
              <NavLink to='/notice'>Notice</NavLink>
            </li>
            <li>
              <NavLink to='/logout'>Logout</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className='navigation'>
      <div className='container'>
        <NavLink to='/' className='logo'>
          <img src={logo} alt='logo' className='logo-image' />
        </NavLink>
        <ul className='navigation-nav'>
          <li>
            <NavLink to='/resources'>Resources</NavLink>
          </li>
          <li>
            <NavLink to='/login-signup'>Login/signup</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(Navigation);
