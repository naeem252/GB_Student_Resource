import React, { useEffect, useRef, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../action/studentAction';
import Spinner from '../spinner/Spinner';
import imageSpinner from '../../images/imageSpinner.gif';
import axios from 'axios';

function Student({
  student,
  getStudent,
  loading,
  authId,
  studentUploadedResources,
  updateStudentImage,
  match: {
    params: { id },
  },
}) {
  const [imageChanging, changeImageState] = useState(false);
  useEffect(() => {
    if (!student || student._id != id) {
      getStudent(id);
    }
  }, [student, getStudent]);

  const imageInput = useRef(null);
  const onImageSubmitHandler = async (e) => {
    e.preventDefault();
    changeImageState(true);
    const form = new FormData();
    form.append('image', imageInput.current.files[0]);
    const res = await axios.patch('/api/v1/student/upload-student-image', form);
    updateStudentImage(authId);

    window.setTimeout(() => changeImageState(false), 2000);
  };

  return (
    <div className='container'>
      {loading || student === null ? (
        <Spinner />
      ) : (
        <div className='profile-container'>
          <div className='profile'>
            <div className='profile-image-box'>
              {imageChanging ? (
                <img src={imageSpinner} alt='me' />
              ) : (
                <img src={`/public/images/studentImages/${student.image}`} alt='me' />
              )}

              {student._id === authId && (
                <Fragment>
                  <label htmlFor='image'>
                    <span className='edit-icon' title='edit image'>
                      <i className='fas fa-pencil-alt'></i>
                    </span>
                  </label>
                  <form>
                    <input
                      ref={imageInput}
                      type='file'
                      id='image'
                      name='image'
                      onChange={(e) => onImageSubmitHandler(e)}
                    />
                  </form>
                </Fragment>
              )}
            </div>
            <h2 className='student-name'>{student.name}</h2>
            <ul className='profile-details'>
              <li>
                <strong className='profile-details__title'>Department:</strong> <span>{student.department}</span>
              </li>
              <li>
                <strong className='profile-details__title'>Semester:</strong> <span>{student.semester}</span>
              </li>
              <li>
                <strong className='profile-details__title'>Batch:</strong>
                <span>{student.batch}</span>
              </li>
              <li>
                <strong className='profile-details__title'>Class roll:</strong> <span>{student.classRoll}</span>
              </li>
              <li>
                <strong className='profile-details__title'>Resource Shared:</strong>{' '}
                <span>{studentUploadedResources && studentUploadedResources.length}</span>
              </li>
            </ul>
            {student._id === authId && (
              <Link to='/edit-profile' className='btn edit-profile-btn'>
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    student: state.student.student,
    loading: state.student.loading,
    authId: state.auth.student._id,
    studentUploadedResources: state.student.studentUploadedResources,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudent: (id) => dispatch(actions.getStudent(id)),
    updateStudentImage: (id) => dispatch(actions.updateStudentImage(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Student);
