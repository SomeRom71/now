import { combineReducers } from 'redux';
import { reducer as modal } from 'redux-modal';
import positionReducer from './position-reducer';

interface AppState {
  position: {
    coords: number[],
    cityCoords: number[],
    cityName: string,
    countryCode: string,
  }
}

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}

export const rootReducer = combineReducers({
  modal,
  position: positionReducer,
});
