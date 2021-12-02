import { combineReducers } from 'redux';
import { logInReducer } from './authReducer';

export default combineReducers({
    logIn: logInReducer
});