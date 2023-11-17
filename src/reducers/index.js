import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bannerReducer from './bannerReducer';

export default combineReducers({
	auth: authReducer,
	banner: bannerReducer
});