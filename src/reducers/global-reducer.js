import {
  CHANGE_GLOBAL_STATE,
} from '../constants/actions-constants';

const initialState = [
  {
    text: 'Use Redux',
  },
];

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GLOBAL_STATE:
      return [
        ...state,
        {
          text: action.payload,
        },
      ];
    default:
      return state;
  }
}
