import {
    ADD_USER_FAIL,
    ADD_USER_REQUEST,
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
    UPDATE_USER_SUCCESS,
} from '../constants/users';
import axios from 'axios';
import env from '../env.json';
const url = env.BASE_HOST;
export const getAllUsers = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_USERS_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auth_token}`,
            },
        };

        const { data } = await axios.get(
            url + `/users/getUsers?page=${page}&limit=${limit}&role=user`,
            config
        );
        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const getUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_USER_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auth_token}`,
            },
        };

        const { data } = await axios.get(
            url + `/users/getUserById/${id}`,
            config
        );
        dispatch({
            type: GET_USER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const login = (form) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(url + '/users/login', form, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const register = (form) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            url + '/users/register',
            form,
            config
        );
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });

        const user = JSON.stringify(data);

        localStorage.setItem('userInfo', {
            auth_token: user.auth_token,
            info: user.resutl,
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const logout = () => async (dispatch, getState) => {
    try {
        dispatch({ type: LOGOUT_REQUEST });

        const {
            login: { userInfo },
        } = getState();

        console.log(userInfo);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auth_token}`,
            },
        };
        const { data } = await axios.post(url + '/users/logout', {}, config);
        localStorage.removeItem('userInfo');
        dispatch({ type: LOGOUT_SUCCESS, payload: data });
        dispatch({ type: LOGIN_RESET });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const addUser = (body) => async (dispatch, getState) => {
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }

    try {
        dispatch({
            type: ADD_USER_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auth_token}`,
            },
        };

        const { data } = await axios.post(
            env.BASE_HOST + '/users/register',
            body,
            config
        );

        if (data) {
            dispatch({
                type: ADD_USER_SUCCESS,
                payload: data.users,
            });
            dispatch({
                type: GET_ALL_USERS_RESET,
            });
        } else {
            dispatch({
                type: ADD_USER_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const updateUser = (id, body) => async (dispatch, getState) => {
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }

    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auth_token}`,
            },
        };
        const { data } = await axios.put(
            env.BASE_HOST + `/users/updateUser/${id}`,
            body,
            config
        );

        if (data) {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: data.user,
            });
            dispatch({
                type: GET_ALL_USERS_RESET,
            });
        } else {
            dispatch({
                type: UPDATE_USER_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auth_token}`,
            },
        };

        const { data } = await axios.delete(
            env.BASE_HOST + `/users/delete/${id}`,
            config
        );

        if (data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: data.user,
            });
            setTimeout(() => {
                dispatch({ type: DELETE_USER_RESET });
                dispatch({
                    type: GET_ALL_USERS_RESET,
                });
            }, 600);
        } else {
            dispatch({
                type: DELETE_USER_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};
