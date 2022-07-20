import {
  ADD_SESSION_FAIL,
  ADD_SESSION_REQUEST,
  ADD_SESSION_SUCCESS,
  DELETE_SESSION_FAIL,
  DELETE_SESSION_REQUEST,
  DELETE_SESSION_RESET,
  DELETE_SESSION_SUCCESS,
  GET_ALL_SESSIONS_FAIL,
  GET_ALL_SESSIONS_REQUEST,
  GET_ALL_SESSIONS_RESET,
  GET_ALL_SESSIONS_SUCCESS,
  GET_SESSION_FAIL,
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  UPDATE_SESSION_FAIL,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS,
} from "../constants/sessions";
import axios from "axios";

import env from "../env.json";

export const getAllRooms = (page, limit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_SESSIONS_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(
      env.BASE_HOST + `/rooms?page=${page}&limit=${limit}`,
      config
    );

    if (data.success) {
      dispatch({
        type: GET_ALL_SESSIONS_SUCCESS,
        payload: data.rooms,
      });
    } else {
      dispatch({
        type: GET_ALL_SESSIONS_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_SESSIONS_FAIL,
      payload: error.response.data.error || error.response.data.errors,
    });
  }
};

export const getRoom = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SESSION_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.get(env.BASE_HOST + `/rooms/${id}`, config);
    dispatch({
      type: GET_SESSION_SUCCESS,
      payload: data.room,
    });
  } catch (error) {
    dispatch({
      type: GET_SESSION_FAIL,
      payload: error.response.data.error || error.response.data.errors,
    });
  }
};

export const addRoom = (body) => async (dispatch, getState) => {
  body.private = body.private === "true" ? true : false;
  for (let key in body) {
    if (body[key] === "") {
      body[key] = undefined;
    }
  }
  body.password = body.private === false ? undefined : body.password;

  try {
    dispatch({
      type: ADD_SESSION_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.post(env.BASE_HOST + "/rooms", body, config);

    if (data.success) {
      dispatch({
        type: ADD_SESSION_SUCCESS,
        payload: data.rooms,
      });
      dispatch({
        type: GET_ALL_SESSIONS_RESET,
      });
    } else {
      dispatch({
        type: ADD_SESSION_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_SESSION_FAIL,
      payload: error.response.data.error || error.response.data.errors,
    });
  }
};

export const updateRoom = (id, body) => async (dispatch, getState) => {
  // turn the string to boolian
  body.private = body.private === "true" ? true : false;
  for (let key in body) {
    if (body[key] === "") {
      body[key] = undefined;
    }
  }
  body.password = body.private === false ? undefined : body.password;

  console.log(body);

  try {
    dispatch({
      type: UPDATE_SESSION_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.auth_token}`,
      },
    };
    const { data } = await axios.put(
      env.BASE_HOST + `/rooms/${id}`,
      body,
      config
    );

    if (data.success) {
      dispatch({
        type: UPDATE_SESSION_SUCCESS,
        payload: data.room,
      });
      dispatch({
        type: GET_ALL_SESSIONS_RESET,
      });
    } else {
      dispatch({
        type: UPDATE_SESSION_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_SESSION_FAIL,
      payload: error.response.data.error || error.response.data.errors,
    });
  }
};

export const deleteRoom = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_SESSION_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.auth_token}`,
      },
    };

    const { data } = await axios.delete(env.BASE_HOST + `/rooms/${id}`, config);

    if (data.success) {
      dispatch({
        type: DELETE_SESSION_SUCCESS,
        payload: data.rooms,
      });
      setTimeout(() => {
        dispatch({ type: DELETE_SESSION_RESET });
        dispatch({
          type: GET_ALL_SESSIONS_RESET,
        });
      }, 600);
    } else {
      dispatch({
        type: DELETE_SESSION_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_SESSION_FAIL,
      payload: error.response.data.error || error.response.data.errors,
    });
  }
};
