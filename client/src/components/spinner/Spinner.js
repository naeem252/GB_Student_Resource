import React from 'react';
import spinner from '../../images/spinner.gif';

function Spinner() {
  const style = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  };
  return (
    <div style={style}>
      <img style={{ width: '200px', height: '200px' }} src={spinner} alt='spinner' />
    </div>
  );
}

export default Spinner;
