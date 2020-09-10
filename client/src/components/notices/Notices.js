import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Notice from './Notice';
import Spinner from '../spinner/Spinner';
import { getNotices } from '../../action/noticeAction';
function Notices({ notices, getNotices, loading, student, token }) {
  const [myToken, setToken] = useState(token);
  useEffect(() => {
    if (notices.length <= 0 || myToken != token) {
      setToken(token);
      getNotices();
    }
  }, [getNotices]);
  return (
    <div className='container'>
      <div className='container__notice'>
        {student.CR && (
          <Link to='/add-notice' className='btn btn-primary'>
            Add Notice
          </Link>
        )}
        {loading ? (
          <Spinner />
        ) : notices.length <= 0 ? (
          <h1>NO Notice Found</h1>
        ) : (
          notices.map((notice) => <Notice key={notice._id} notice={notice} />)
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notices: state.notice.notices,
    loading: state.notice.loading,
    student: state.auth.student,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotices: () => dispatch(getNotices()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notices);
