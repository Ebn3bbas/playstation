import {
    GET_ALL_RESELLERS_FAIL,
    GET_ALL_RESELLERS_REQUEST,
    GET_ALL_RESELLERS_RESET,
    GET_ALL_RESELLERS_SUCCESS,
} from '../constants/resellers';

export const getAllResellersReducer = (state = { resellers: [] }, action) => {
    switch (action.type) {
        case GET_ALL_RESELLERS_REQUEST:
            return { loading: true };
        case GET_ALL_RESELLERS_SUCCESS:
            return { loading: false, resellers: action.payload };
        case GET_ALL_RESELLERS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_RESELLERS_RESET:
            return { resellers: [] };
        default:
            return state;
    }
};
