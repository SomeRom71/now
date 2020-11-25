import { CHANGE_POSITION_STATE } from '../constants/actions-constants';
import { IPositionData } from '../reducers/position-reducer';

export const setPosition = (data: IPositionData) => (
  {
    type: CHANGE_POSITION_STATE,
    payload: data,
  }
);
