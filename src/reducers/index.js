import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import globalReducer from './global-reducer';

export const rootReducer = combineReducers({
  modal,
  global: globalReducer,
});
