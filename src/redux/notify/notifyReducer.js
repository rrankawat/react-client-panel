import { NOTIFY_USER } from './types';

const initialState = {
  message: null,
  messageType: null,
};

const nofityReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType,
      };
    default:
      return state;
  }
};

export default nofityReducer;
