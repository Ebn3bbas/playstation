import {
    GET_ALL_STORES_FAIL,
    GET_ALL_STORES_REQUEST,
    GET_ALL_STORES_RESET,
    GET_ALL_STORES_SUCCESS,
} from '../constants/store';

export const getAllStoreReducer = (state = { stores: null }, action) => {
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
