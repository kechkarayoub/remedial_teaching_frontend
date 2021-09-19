import {combineReducers} from 'redux';
import session_reducer from './session_reducer';

export default combineReducers({
  session_reducer: session_reducer
});
