import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducers';
import resources from './resourcesReducer';
import student from './studentReducer';
import notice from './noticeReducer';

export default combineReducers({ auth, alert, resources, student, notice });
