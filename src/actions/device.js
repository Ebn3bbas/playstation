import {
    GET_ALL_DEVICES_FAIL,
    GET_ALL_DEVICES_REQUEST,
    GET_ALL_DEVICES_RESET,
    GET_ALL_DEVICES_SUCCESS,
    ADD_DEVICE_FAIL,
    ADD_DEVICE_REQUEST,
    ADD_DEVICE_SUCCESS,
    DELETE_DEVICE_FAIL,
    DELETE_DEVICE_REQUEST,
    DELETE_DEVICE_RESET,
    DELETE_DEVICE_SUCCESS,
    GET_DEVICE_FAIL,
    GET_DEVICE_REQUEST,
    GET_DEVICE_SUCCESS,
    UPDATE_DEVICE_FAIL,
    UPDATE_DEVICE_REQUEST,
    UPDATE_DEVICE_SUCCESS,
} from '../constants/device';
import axios from 'axios';

import env from '../env.json';
export const getAllDevices =
    (page, limit, is_active) => async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_ALL_DEVICES_REQUEST,
            });

            const {
                login: { userInfo },
            } = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            if (page && limit) {
                const { data } = await axios.get(
                    env.BASE_HOST +
                        `/stores/devices?page=${page}&limit=${limit}`,
                    config
                );
                dispatch({
                    type: GET_ALL_DEVICES_SUCCESS,
                    payload: data,
                });
            } else {
                const { data } = await axios.get(
                    env.BASE_HOST + `/stores/devices?is_active=${is_active}`,
                    config
                );
                dispatch({
                    type: GET_ALL_DEVICES_SUCCESS,
                    payload: data,
                });
            }
        } catch (error) {
            dispatch({
                type: GET_ALL_DEVICES_FAIL,
                payload:
                    error.response.data.error || error.response.data.errors,
            });
        }
    };

export const getDevice = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_DEVICE_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            env.BASE_HOST + `/Device/getDevice/${id}`,
            config
        );
        dispatch({
            type: GET_DEVICE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_DEVICE_FAIL,
            payload: 'failed',
        });
    }
};

export const addDevice = (body) => async (dispatch, getState) => {
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }
    try {
        dispatch({
            type: ADD_DEVICE_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            env.BASE_HOST + '/stores/createDevice/',
            body,
            config
        );

        if (data) {
            dispatch({
                type: ADD_DEVICE_SUCCESS,
                payload: data,
            });
            dispatch({
                type: GET_ALL_DEVICES_RESET,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_DEVICE_FAIL,
            payload: 'failed',
        });
    }
};

export const updateDevice = (id, body) => async (dispatch, getState) => {
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }
    console.log(body);

    try {
        dispatch({
            type: UPDATE_DEVICE_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            env.BASE_HOST + `/stores/devices/update/${id}/`,
            body,
            config
        );

        if (data.success) {
            dispatch({
                type: UPDATE_DEVICE_SUCCESS,
                payload: data.device,
            });
            dispatch({
                type: GET_ALL_DEVICES_RESET,
            });
        } else {
            dispatch({
                type: UPDATE_DEVICE_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_DEVICE_FAIL,
            payload: 'failed',
        });
    }
};

export const deleteDevice = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_DEVICE_REQUEST,
        });

        const {
            login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            env.BASE_HOST + `/stores/devices/delete/${id}/`,
            config
        );

        if (data.success) {
            dispatch({
                type: DELETE_DEVICE_SUCCESS,
                payload: data.device,
            });
            setTimeout(() => {
                dispatch({ type: DELETE_DEVICE_RESET });
                dispatch({
                    type: GET_ALL_DEVICES_RESET,
                });
            }, 600);
        } else {
            dispatch({
                type: DELETE_DEVICE_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_DEVICE_FAIL,
            payload: 'failed',
        });
    }
};
