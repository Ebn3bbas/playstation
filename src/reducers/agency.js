import {
    ADD_AGENCY_FAIL,
    ADD_AGENCY_REQUEST,
    ADD_AGENCY_RESET,
    ADD_AGENCY_SUCCESS,
    DELETE_AGENCY_FAIL,
    DELETE_AGENCY_REQUEST,
    DELETE_AGENCY_RESET,
    DELETE_AGENCY_SUCCESS,
    GET_AGENCY_FAIL,
    GET_AGENCY_REQUEST,
    GET_AGENCY_RESET,
    GET_AGENCY_SUCCESS,
    GET_ALL_AGENCYS_FAIL,
    GET_ALL_AGENCYS_REQUEST,
    GET_ALL_AGENCYS_RESET,
    GET_ALL_AGENCYS_SUCCESS,
    UPDATE_AGENCY_FAIL,
    UPDATE_AGENCY_REQUEST,
    UPDATE_AGENCY_RESET,
    UPDATE_AGENCY_SUCCESS,
} from '../constants/agency';

export const getAllAgencysReducer = (state = { agencys: null }, action) => {
    switch (action.type) {
        case GET_ALL_AGENCYS_REQUEST:
            return { loading: true };
        case GET_ALL_AGENCYS_SUCCESS:
            return { loading: false, agencys: action.payload };
        case GET_ALL_AGENCYS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_AGENCYS_RESET:
            return { agencys: null };
        default:
            return state;
    }
};

export const getAgencyReducer = (state = { agency: null }, action) => {
    switch (action.type) {
        case GET_AGENCY_REQUEST:
            return { loading: true };
        case GET_AGENCY_SUCCESS:
            return { loading: false, agency: action.payload };
        case GET_AGENCY_FAIL:
            return { loading: false, error: action.payload };
        case GET_AGENCY_RESET:
            return { agency: null };
        default:
            return state;
    }
};

export const addAgencyReducer = (state = { agency: null }, action) => {
    switch (action.type) {
        case ADD_AGENCY_REQUEST:
            return { loading: true };
        case ADD_AGENCY_SUCCESS:
            return { loading: false, success: true, agency: action.payload };
        case ADD_AGENCY_FAIL:
            return { loading: false, error: action.payload };
        case ADD_AGENCY_RESET:
            return { agency: null };
        default:
            return state;
    }
};

export const updateAgencyReducer = (state = { agency: null }, action) => {
    switch (action.type) {
        case UPDATE_AGENCY_REQUEST:
            return { loading: true };
        case UPDATE_AGENCY_SUCCESS:
            return { loading: false, success: true, agency: action.payload };
        case UPDATE_AGENCY_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_AGENCY_RESET:
            return { agency: null };
        default:
            return state;
    }
};

export const deleteAgencyReducer = (state = { agency: null }, action) => {
    switch (action.type) {
        case DELETE_AGENCY_REQUEST:
            return { loading: true };
        case DELETE_AGENCY_SUCCESS:
            return { loading: false, success: true, agency: action.payload };
        case DELETE_AGENCY_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_AGENCY_RESET:
            return { agency: null };
        default:
            return state;
    }
};
