import {
  DISPLAY_SPINNER,
  CLEAR_SPINNER,
  SETUP_USER,
  GET_ALL_TASKS,
  SET_SEARCH,
  HANDLE_STATUS,
  LOGOUT_USER,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_SPINNER) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CLEAR_SPINNER) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SETUP_USER) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === GET_ALL_TASKS) {
    return {
      ...state,
      tasks: action.payload.tasks,
    };
  }
  if (action.type === SET_SEARCH) {
    return {
      ...state,
      search: action.payload.value,
    };
  }
  if (action.type === HANDLE_STATUS) {
    return {
      ...state,
      isActive: action.payload.value,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
};

export default reducer;
