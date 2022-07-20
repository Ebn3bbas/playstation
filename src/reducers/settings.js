import {
  ADD_SETTINGS_FAIL,
  ADD_SETTINGS_REQUEST,
  ADD_SETTINGS_SUCCESS,
} from "../constants/settings";

export const creatSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SETTINGS_REQUEST:
      return { loading: true };
    case ADD_SETTINGS_SUCCESS:
      return { loading: false, settings: action.payload };
    case ADD_SETTINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
