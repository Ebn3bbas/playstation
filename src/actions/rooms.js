import {
    ADD_ROOM_FAIL,
    ADD_ROOM_REQUEST,
    ADD_ROOM_SUCCESS,
    DELETE_ROOM_FAIL,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_RESET,
    DELETE_ROOM_SUCCESS,
    GET_ALL_ROOMS_FAIL,
    GET_ALL_ROOMS_REQUEST,
    GET_ALL_ROOMS_RESET,
    GET_ALL_ROOMS_SUCCESS,
    GET_ROOM_FAIL,
    GET_ROOM_REQUEST,
    GET_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_SUCCESS,
} from '../constants/rooms';
import axios from 'axios';

import env from '../env.json';

export const getAllRooms = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_ROOMS_REQUEST,
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
            env.BASE_HOST + `/rooms?page=${page}&limit=${limit}`,
            config
        );

        if (data.success) {
            dispatch({
                type: GET_ALL_ROOMS_SUCCESS,
                payload: data.rooms,
            });
        } else {
            dispatch({
                type: GET_ALL_ROOMS_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_ROOMS_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const getRoom = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ROOM_REQUEST,
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
            env.BASE_HOST + `/rooms/${id}`,
            config
        );
        dispatch({
            type: GET_ROOM_SUCCESS,
            payload: data.room,
        });
    } catch (error) {
        dispatch({
            type: GET_ROOM_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const addRoom = (body) => async (dispatch, getState) => {
    body.private = body.private === 'true' ? true : false;
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }
    body.password = body.private === false ? undefined : body.password;

    try {
        dispatch({
            type: ADD_ROOM_REQUEST,
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
            env.BASE_HOST + '/rooms',
            body,
            config
        );

        if (data.success) {
            dispatch({
                type: ADD_ROOM_SUCCESS,
                payload: data.rooms,
            });
            dispatch({
                type: GET_ALL_ROOMS_RESET,
            });
        } else {
            dispatch({
                type: ADD_ROOM_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_ROOM_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const updateRoom = (id, body) => async (dispatch, getState) => {
    // turn the string to boolian
    body.private = body.private === 'true' ? true : false;
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }
    body.password = body.private === false ? undefined : body.password;

    console.log(body);

    try {
        dispatch({
            type: UPDATE_ROOM_REQUEST,
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
            env.BASE_HOST + `/rooms/${id}`,
            body,
            config
        );

        if (data.success) {
            dispatch({
                type: UPDATE_ROOM_SUCCESS,
                payload: data.room,
            });
            dispatch({
                type: GET_ALL_ROOMS_RESET,
            });
        } else {
            dispatch({
                type: UPDATE_ROOM_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_ROOM_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const deleteRoom = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_ROOM_REQUEST,
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
            env.BASE_HOST + `/rooms/${id}`,
            config
        );

        if (data.success) {
            dispatch({
                type: DELETE_ROOM_SUCCESS,
                payload: data.rooms,
            });
            setTimeout(() => {
                dispatch({ type: DELETE_ROOM_RESET });
                dispatch({
                    type: GET_ALL_ROOMS_RESET,
                });
            }, 600);
        } else {
            dispatch({
                type: DELETE_ROOM_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_ROOM_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};
