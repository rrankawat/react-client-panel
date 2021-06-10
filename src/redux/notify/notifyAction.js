import { NOTIFY_USER } from './types';

export const notifyUser = (data) => (dispatch) => {
  dispatch({ type: NOTIFY_USER, payload: data });
};
