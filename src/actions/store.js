import axios from "axios";
import {
  GET_ALL_STORES_FAIL,
  GET_ALL_STORES_REQUEST,
  GET_ALL_STORES_SUCCESS,
  GET_ALL_STORES_RESET,
  ADD_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_RESET,
  DELETE_STORE_SUCCESS,
  GET_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
} from "../constants/store";
import env from "../env.json";
const url = env.BASE_HOST;
export const getAllStores = (page, limit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_STORES_REQUEST,
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

    const { data } = await axios.get(
      url + `/products/?page=${page}&limit=${limit}`,
      config
    );
    dispatch({
      type: GET_ALL_STORES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_STORES_FAIL,
      payload: error.message,
    });
  }
};

export const getStore = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_STORE_REQUEST,
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

    const { data } = await axios.get(env.BASE_HOST + `/products/${id}`, config);
    dispatch({
      type: GET_STORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_STORE_FAIL,
      payload: "failed",
    });
  }
};

export const addStore = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_STORE_REQUEST,
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

    const { data } = await axios.post(
      env.BASE_HOST + "/products/create/",
      body,
      config
    );

    if (data.success) {
      dispatch({
        type: ADD_STORE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_STORES_RESET,
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_STORE_FAIL,
      payload: "failed",
    });
  }
};

export const updateStore = (id, body) => async (dispatch, getState) => {
  for (let key in body) {
    if (body[key] === "") {
      body[key] = undefined;
    }
  }
  console.log(body);

  try {
    dispatch({
      type: UPDATE_STORE_REQUEST,
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
    const { data } = await axios.put(
      env.BASE_HOST + `/products/update/${id}/`,
      body,
      config
    );

    if (data.success) {
      dispatch({
        type: UPDATE_STORE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_STORES_RESET,
      });
    } else {
      dispatch({
        type: UPDATE_STORE_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_STORE_FAIL,
      payload: "failed",
    });
  }
};

export const deleteStore = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_STORE_REQUEST,
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

    const { data } = await axios.delete(
      env.BASE_HOST + `/products/delete/${id}/`,
      config
    );
    console.log(data);
    if (data.success) {
      dispatch({
        type: DELETE_STORE_SUCCESS,
        payload: data,
      });
      setTimeout(() => {
        dispatch({ type: DELETE_STORE_RESET });
        dispatch({
          type: GET_ALL_STORES_RESET,
        });
      }, 600);
    } else {
      dispatch({
        type: DELETE_STORE_FAIL,
        payload: data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
      payload: "failed",
    });
  }
};
