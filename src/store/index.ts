// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import { authReducer } from './reducers';

// Redux: Root Reducer
export const rootReducer = combineReducers({
  auth: authReducer,
});
