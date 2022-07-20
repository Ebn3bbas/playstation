import {
  ADD_DEVICE_FAIL,
  ADD_DEVICE_REQUEST,
  ADD_DEVICE_RESET,
  ADD_DEVICE_SUCCESS,
  DELETE_DEVICE_FAIL,
  DELETE_DEVICE_REQUEST,
  DELETE_DEVICE_RESET,
  DELETE_DEVICE_SUCCESS,
  GET_DEVICE_FAIL,
  GET_DEVICE_REQUEST,
  GET_DEVICE_RESET,
  GET_DEVICE_SUCCESS,
  GET_ALL_DEVICES_FAIL,
  GET_ALL_DEVICES_REQUEST,
  GET_ALL_DEVICES_RESET,
  GET_ALL_DEVICES_SUCCESS,
  UPDATE_DEVICE_FAIL,
  UPDATE_DEVICE_REQUEST,
  UPDATE_DEVICE_RESET,
  UPDATE_DEVICE_SUCCESS,
} from "../constants/device";

export const getAllDevicesReducer = (state = { devices: null }, action) => {
  switch (action.type) {
    case GET_ALL_DEVICES_REQUEST:
      return { loading: true };
    case GET_ALL_DEVICES_SUCCESS:
      return { loading: false, devices: action.payload };
    case GET_ALL_DEVICES_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_DEVICES_RESET:
      return { devices: null };
    default:
      return state;
  }
};

export const getDeviceReducer = (state = { device: null }, action) => {
  switch (action.type) {
    case GET_DEVICE_REQUEST:
      return { loading: true };
    case GET_DEVICE_SUCCESS:
      return { loading: false, device: action.payload };
    case GET_DEVICE_FAIL:
      return { loading: false, error: action.payload };
    case GET_DEVICE_RESET:
      return { device: null };
    default:
      return state;
  }
};

export const addDeviceReducer = (state = { device: null }, action) => {
  switch (action.type) {
    case ADD_DEVICE_REQUEST:
      return { loading: true };
    case ADD_DEVICE_SUCCESS:
      return { loading: false, success: true, device: action.payload };
    case ADD_DEVICE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_DEVICE_RESET:
      return { device: null };
    default:
      return state;
  }
};

export const updateDeviceReducer = (state = { device: null }, action) => {
  switch (action.type) {
    case UPDATE_DEVICE_REQUEST:
      return { loading: true };
    case UPDATE_DEVICE_SUCCESS:
      return { loading: false, success: true, device: action.payload };
    case UPDATE_DEVICE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_DEVICE_RESET:
      return { device: null };
    default:
      return state;
  }
};

export const deleteDeviceReducer = (state = { device: null }, action) => {
  switch (action.type) {
    case DELETE_DEVICE_REQUEST:
      return { loading: true };
    case DELETE_DEVICE_SUCCESS:
      return { loading: false, success: true, device: action.payload };
    case DELETE_DEVICE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_DEVICE_RESET:
      return { device: null };
    default:
      return state;
  }
};
