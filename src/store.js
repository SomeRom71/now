import { createStore } from 'redux';
import globalReducer from './reducers/global-reducer';

export const store = createStore(globalReducer);
