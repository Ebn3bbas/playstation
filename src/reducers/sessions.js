import {
    ADD_SESSION_FAIL,
    ADD_SESSION_ORDERS_FAIL,
    ADD_SESSION_ORDERS_REQUEST,
    ADD_SESSION_ORDERS_RESET,
    ADD_SESSION_ORDERS_SUCCESS,
    ADD_SESSION_REQUEST,
    ADD_SESSION_RESET,
    ADD_SESSION_SUCCESS,
    DELETE_SESSION_FAIL,
    DELETE_SESSION_REQUEST,
    DELETE_SESSION_RESET,
    DELETE_SESSION_SUCCESS,
    END_SESSION_FAIL,
    END_SESSION_REQUEST,
    END_SESSION_RESET,
    END_SESSION_SUCCESS,
    GET_ALL_ENDED_SESSIONS_FAIL,
    GET_ALL_ENDED_SESSIONS_REQUEST,
    GET_ALL_ENDED_SESSIONS_RESET,
    GET_ALL_ENDED_SESSIONS_SUCCESS,
    GET_ALL_NOT_ENDED_SESSIONS_FAIL,
    GET_ALL_NOT_ENDED_SESSIONS_REQUEST,
    GET_ALL_NOT_ENDED_SESSIONS_RESET,
    GET_ALL_NOT_ENDED_SESSIONS_SUCCESS,
    GET_ALL_SESSIONS_FAIL,
    GET_ALL_SESSIONS_REQUEST,
    GET_ALL_SESSIONS_RESET,
    GET_ALL_SESSIONS_SUCCESS,
    GET_SESSION_FAIL,
    GET_SESSION_REQUEST,
    GET_SESSION_RESET,
    GET_SESSION_SUCCESS,
    UPDATE_SESSION_FAIL,
    UPDATE_SESSION_REQUEST,
    UPDATE_SESSION_RESET,
    UPDATE_SESSION_SUCCESS,
} from '../constants/sessions';

export const getAllSessionsReducer = (state = { sessions: null }, action) => {
    switch (action.type) {
        case GET_ALL_SESSIONS_REQUEST:
            return { loading: true };
        case GET_ALL_SESSIONS_SUCCESS:
            return { loading: false, sessions: action.payload };
        case GET_ALL_SESSIONS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_SESSIONS_RESET:
            return { sessions: null };
        default:
            return state;
    }
};

export const getAllEndedSessionsReducer = (
    state = { endedSessions: null },
    action
) => {
    switch (action.type) {
        case GET_ALL_ENDED_SESSIONS_REQUEST:
            return { loading: true };
        case GET_ALL_ENDED_SESSIONS_SUCCESS:
            return { loading: false, endedSessions: action.payload };
        case GET_ALL_ENDED_SESSIONS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_ENDED_SESSIONS_RESET:
            return { endedSessions: null };
        default:
            return state;
    }
};

export const getAllNotEndedSessionsReducer = (
    state = { notEndedSessions: null },
    action
) => {
    switch (action.type) {
        case GET_ALL_NOT_ENDED_SESSIONS_REQUEST:
            return { loading: true };
        case GET_ALL_NOT_ENDED_SESSIONS_SUCCESS:
            return { loading: false, notEndedSessions: action.payload };
        case GET_ALL_NOT_ENDED_SESSIONS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_NOT_ENDED_SESSIONS_RESET:
            return { notEndedSessions: null };
        default:
            return state;
    }
};

export const getSessionReducer = (state = { session: null }, action) => {
    switch (action.type) {
        case GET_SESSION_REQUEST:
            return { loading: true };
        case GET_SESSION_SUCCESS:
            return { loading: false, session: action.payload };
        case GET_SESSION_FAIL:
            return { loading: false, error: action.payload };
        case GET_SESSION_RESET:
            return { session: null };
        default:
            return state;
    }
};

export const addSessionReducer = (state = { session: null }, action) => {
    switch (action.type) {
        case ADD_SESSION_REQUEST:
            return { loading: true };
        case ADD_SESSION_SUCCESS:
            return { loading: false, success: true, session: action.payload };
        case ADD_SESSION_FAIL:
            return { loading: false, error: action.payload };
        case ADD_SESSION_RESET:
            return { session: null };
        default:
            return state;
    }
};

export const endSessionReducer = (state = { session: null }, action) => {
    switch (action.type) {
        case END_SESSION_REQUEST:
            return { loading: true };
        case END_SESSION_SUCCESS:
            return { loading: false, success: true, session: action.payload };
        case END_SESSION_FAIL:
            return { loading: false, error: action.payload };
        case END_SESSION_RESET:
            return { session: null };
        default:
            return state;
    }
};

export const addSessionOrderReducer = (state = { session: null }, action) => {
    switch (action.type) {
        case ADD_SESSION_ORDERS_REQUEST:
            return { loading: true };
        case ADD_SESSION_ORDERS_SUCCESS:
            return { loading: false, success: true, session: action.payload };
        case ADD_SESSION_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        case ADD_SESSION_ORDERS_RESET:
            return { session: null };
        default:
            return state;
    }
};

export const updateSessionReducer = (state = { session: null }, action) => {
    switch (action.type) {
        case UPDATE_SESSION_REQUEST:
            return { loading: true };
        case UPDATE_SESSION_SUCCESS:
            return { loading: false, success: true, session: action.payload };
        case UPDATE_SESSION_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_SESSION_RESET:
            return { session: null };
        default:
            return state;
    }
};

export const deleteSessionReducer = (state = { session: null }, action) => {
    switch (action.type) {
        case DELETE_SESSION_REQUEST:
            return { loading: true };
        case DELETE_SESSION_SUCCESS:
            return { loading: false, success: true, session: action.payload };
        case DELETE_SESSION_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_SESSION_RESET:
            return { session: null };
        default:
            return state;
    }
};
