import {
  ADD_SETTINGS_FAIL,
  ADD_SETTINGS_REQUEST,
  ADD_SETTINGS_SUCCESS,
} from "../constants/settings";
import axios from "axios";
import env from "../env.json";
const url = env.BASE_HOST;

export const creatSettings = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SETTINGS_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(url + "/settings/", form, config);
    dispatch({
      type: ADD_SETTINGS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("settings", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADD_SETTINGS_FAIL,
      payload: error.response.data.error || error.response.data.errors,
    });
  }
};
