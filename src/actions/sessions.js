import {
    ADD_SESSION_FAIL,
    ADD_SESSION_ORDERS_FAIL,
    ADD_SESSION_ORDERS_REQUEST,
    ADD_SESSION_ORDERS_SUCCESS,
    ADD_SESSION_REQUEST,
    ADD_SESSION_SUCCESS,
    DELETE_SESSION_FAIL,
    DELETE_SESSION_REQUEST,
    DELETE_SESSION_RESET,
    DELETE_SESSION_SUCCESS,
    END_SESSION_FAIL,
    END_SESSION_REQUEST,
    END_SESSION_SUCCESS,
    GET_ALL_ENDED_SESSIONS_FAIL,
    GET_ALL_ENDED_SESSIONS_REQUEST,
    GET_ALL_ENDED_SESSIONS_SUCCESS,
    GET_ALL_NOT_ENDED_SESSIONS_FAIL,
    GET_ALL_NOT_ENDED_SESSIONS_REQUEST,
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
    UPDATE_SESSION_SUCCESS,
} from '../constants/sessions';
import axios from 'axios';

import env from '../env.json';

export const getAllSessions = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_SESSIONS_REQUEST,
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
            env.BASE_HOST + `/stores/sessions?page=${page}&limit=${limit}`,
            config
        );

        dispatch({
            type: GET_ALL_SESSIONS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_SESSIONS_FAIL,
            payload: 'failed',
        });
    }
};

export const getAllEndedSessions =
    (page, limit) => async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_ALL_ENDED_SESSIONS_REQUEST,
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
                env.BASE_HOST +
                    `/stores/sessions?page=${page}&limit=${limit}&is_ended=True`,
                config
            );

            dispatch({
                type: GET_ALL_ENDED_SESSIONS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_ENDED_SESSIONS_FAIL,
                payload:
                    error.response.data.error || error.response.data.errors,
            });
        }
    };

export const getAllNotEndedSessions =
    (page, limit) => async (dispatch, getState) => {
        try {
            dispatch({
                type: GET_ALL_NOT_ENDED_SESSIONS_REQUEST,
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
                env.BASE_HOST +
                    `/stores/sessions?page=${page}&limit=${limit}&is_ended=False`,
                config
            );

            dispatch({
                type: GET_ALL_NOT_ENDED_SESSIONS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: GET_ALL_NOT_ENDED_SESSIONS_FAIL,
                payload:
                    error.response.data.error || error.response.data.errors,
            });
        }
    };

export const getSession = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_SESSION_REQUEST,
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
            env.BASE_HOST + `/stores/sessions/${id}`,
            config
        );
        dispatch({
            type: GET_SESSION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_SESSION_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const addSession = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_SESSION_REQUEST,
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
            env.BASE_HOST + `/stores/createSession/${body.device.id}/`,
            body,
            config
        );

        if (data.success) {
            dispatch({
                type: ADD_SESSION_SUCCESS,
                payload: data,
            });
            dispatch({
                type: GET_ALL_SESSIONS_RESET,
            });
        } else {
            dispatch({
                type: ADD_SESSION_FAIL,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_SESSION_FAIL,
            payload: 'failed',
        });
    }
};

export const endSession = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: END_SESSION_REQUEST,
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
            env.BASE_HOST +
                `/stores/sessions/end/${body.deviceId}/${body.sessionId}/`,
            null,
            config
        );

        if (data.success) {
            dispatch({
                type: END_SESSION_SUCCESS,
                payload: data,
            });
            dispatch({
                type: GET_SESSION_RESET,
            });
            dispatch({
                type: GET_ALL_SESSIONS_RESET,
            });
        } else {
            dispatch({
                type: END_SESSION_FAIL,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_SESSION_FAIL,
            payload: 'failed',
        });
    }
};

export const addOrders = (body) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_SESSION_ORDERS_REQUEST,
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
            env.BASE_HOST +
                `/stores/sessions/orders/create/${body.sessionId}/${body.productId}/`,
            null,
            config
        );

        if (data.success) {
            dispatch({
                type: ADD_SESSION_ORDERS_SUCCESS,
                payload: data,
            });
            dispatch({
                type: GET_ALL_SESSIONS_RESET,
            });
        } else {
            dispatch({
                type: ADD_SESSION_ORDERS_FAIL,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_SESSION_ORDERS_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const updateSession =
    (sessionId, deviceId, body) => async (dispatch, getState) => {
        try {
            dispatch({
                type: UPDATE_SESSION_REQUEST,
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
                env.BASE_HOST +
                    `/stores/sessions/update/${deviceId}/${sessionId}/`,
                body,
                config
            );

            if (data.success) {
                dispatch({
                    type: UPDATE_SESSION_SUCCESS,
                    payload: data.room,
                });
                dispatch({
                    type: GET_ALL_SESSIONS_RESET,
                });
            } else {
                dispatch({
                    type: UPDATE_SESSION_FAIL,
                    payload: data.error,
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_SESSION_FAIL,
                payload:
                    error.response.data.error || error.response.data.errors,
            });
        }
    };

export const deleteSession = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_SESSION_REQUEST,
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
            env.BASE_HOST + `/stores/sessions/delete/${id}/`,
            config
        );

        if (data.success) {
            dispatch({
                type: DELETE_SESSION_SUCCESS,
                payload: data,
            });
            setTimeout(() => {
                dispatch({ type: DELETE_SESSION_RESET });
                dispatch({
                    type: GET_ALL_SESSIONS_RESET,
                });
            }, 600);
        } else {
            dispatch({
                type: DELETE_SESSION_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_SESSION_FAIL,
            payload: 'failed',
        });
    }
};
