import {
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
    ADD_USER_RESET,
    ADD_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_RESET,
    DELETE_USER_SUCCESS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_RESET,
    GET_ALL_USERS_SUCCESS,
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_RESET,
    GET_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_RESET,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
} from '../constants/users';

export const getAllUsersReducer = (state = { users: null }, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return { loading: true };
        case GET_ALL_USERS_SUCCESS:
            return { loading: false, users: action.payload };
        case GET_ALL_USERS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_USERS_RESET:
            return { users: null };
        default:
            return state;
    }
};

export const getUserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return { loading: true };
        case GET_USER_SUCCESS:
            return { loading: false, user: action.payload };
        case GET_USER_FAIL:
            return { loading: false, error: action.payload };
        case GET_USER_RESET:
            return { user: null };
        default:
            return state;
    }
};

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true };
        case LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case LOGIN_RESET:
            return {};
        default:
            return state;
    }
};

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return { loading: true };
        case REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const logoutReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return { loading: true };
        case LOGOUT_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case LOGOUT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const addUserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case ADD_USER_REQUEST:
            return { loading: true };
        case ADD_USER_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case ADD_USER_FAIL:
            return { loading: false, error: action.payload };
        case ADD_USER_RESET:
            return { user: null };
        default:
            return state;
    }
};

export const updateUserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return { loading: true };
        case UPDATE_USER_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case UPDATE_USER_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_USER_RESET:
            return { user: null };
        default:
            return state;
    }
};

export const deleteUserReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return { loading: true };
        case DELETE_USER_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case DELETE_USER_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_USER_RESET:
            return { user: null };
        default:
            return state;
    }
};
