import React from 'react';
import { Link } from 'react-router-dom';

function LandingText() {
  return (
    <div className='landing-text-box'>
      <h1>Welcome to GB Student Resources</h1>
      <Link to='/login-signup' className='btn btn-primary' href='#'>
        Sign up
      </Link>
      <Link to='/login-signup' className='btn btn-ghost' href='#'>
        Login
      </Link>
    </div>
  );
}

export default LandingText;
