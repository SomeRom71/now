import { CHANGE_POSITION_STATE } from '../constants/actions-constants';

export const setPosition = (data: any) => (
  {
    type: CHANGE_POSITION_STATE,
    payload: data,
  }
);
