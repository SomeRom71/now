import {
  CHANGE_POSITION_STATE,
} from '../constants/actions-constants';

const initialState = {
  coords: [],
  cityName: '',
  countryCode: '',
  cityCoords: [],
};

export default function positionReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_POSITION_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
