import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action/noticeAction';
import Spinner from '../spinner/Spinner';

function AddNotice({ loading, postNotice }) {
  const [text, setText] = useState('');
  const [heading, setHeading] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postNotice({ text, heading });
  };
  return (
    <Fragment>
      {loading && <Spinner />}
      <div className='login-signup'>
        <div className='login-signup__container'>
          <form action='' className='form addR' onSubmit={(e) => onSubmitHandler(e)} encType='multipart/form-data'>
            <div className='form-group'>
              <label>Heading</label>
              <input
                type='text'
                name='heading'
                placeholder='Heading * '
                className='from-control'
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Text</label>
              <textarea
                type='text'
                name='text'
                placeholder='Text * '
                className='from-control'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <input type='submit' value='Post' className='btn btn-login-signup' />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    postNotice: (body) => dispatch(actions.postNotice(body)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.notice.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNotice);
