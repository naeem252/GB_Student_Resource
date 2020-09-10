import React from 'react';
import Moment from 'react-moment';

function Notice({ notice }) {
  return (
    <div className='notice'>
      <div className='notice-writer'>
        <img src={`/images/studentImages/${notice.cr.image}`} alt={notice.name} />
      </div>
      <div className='notice-text-box'>
        <h1 className='notice-heading'>{notice.heading}</h1>
        <p className='notice-text'>{notice.text}</p>
        <p className='notice-date'>
          <i className='far fa-clock'></i>{' '}
          <Moment format='DD/MM/YYYY HH:mm' subtract={{ hours: 12 }} fromNow>
            {notice.createdAt}
          </Moment>
        </p>
      </div>
    </div>
  );
}

export default Notice;
