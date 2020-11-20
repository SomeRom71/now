import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import positionReducer from './position-reducer';

export const rootReducer = combineReducers({
  modal,
  position: positionReducer,
});
