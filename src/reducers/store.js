import {
  GET_ALL_STORES_FAIL,
  GET_ALL_STORES_REQUEST,
  GET_ALL_STORES_SUCCESS,
  GET_ALL_STORES_RESET,
  ADD_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  ADD_STORE_RESET,
  DELETE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_RESET,
  DELETE_STORE_SUCCESS,
  GET_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_RESET,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_RESET,
} from "../constants/store";

export const getAllStoresReducer = (state = { stores: null }, action) => {
  switch (action.type) {
    case GET_ALL_STORES_REQUEST:
      return { loading: true };
    case GET_ALL_STORES_SUCCESS:
      return { loading: false, stores: action.payload };
    case GET_ALL_STORES_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STORES_RESET:
      return { stores: null };
    default:
      return state;
  }
};

export const getStoreReducer = (state = { store: null }, action) => {
  switch (action.type) {
    case GET_STORE_REQUEST:
      return { loading: true };
    case GET_STORE_SUCCESS:
      return { loading: false, store: action.payload };
    case GET_STORE_FAIL:
      return { loading: false, error: action.payload };
    case GET_STORE_RESET:
      return { store: null };
    default:
      return state;
  }
};

export const addStoreReducer = (state = { store: null }, action) => {
  switch (action.type) {
    case ADD_STORE_REQUEST:
      return { loading: true };
    case ADD_STORE_SUCCESS:
      return { loading: false, success: true, store: action.payload };
    case ADD_STORE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_STORE_RESET:
      return { store: null };
    default:
      return state;
  }
};

export const updateStoreReducer = (state = { store: null }, action) => {
  switch (action.type) {
    case UPDATE_STORE_REQUEST:
      return { loading: true };
    case UPDATE_STORE_SUCCESS:
      return { loading: false, success: true, store: action.payload };
    case UPDATE_STORE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_STORE_RESET:
      return { store: null };
    default:
      return state;
  }
};

export const deleteStoreReducer = (state = { store: null }, action) => {
  switch (action.type) {
    case DELETE_STORE_REQUEST:
      return { loading: true };
    case DELETE_STORE_SUCCESS:
      return { loading: false, success: true, store: action.payload };
    case DELETE_STORE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_STORE_RESET:
      return { store: null };
    default:
      return state;
  }
};
