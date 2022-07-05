import {
    ADD_AGENCY_FAIL,
    ADD_AGENCY_REQUEST,
    ADD_AGENCY_SUCCESS,
    DELETE_AGENCY_FAIL,
    DELETE_AGENCY_REQUEST,
    DELETE_AGENCY_RESET,
    DELETE_AGENCY_SUCCESS,
    GET_AGENCY_FAIL,
    GET_AGENCY_REQUEST,
    GET_AGENCY_SUCCESS,
    GET_ALL_AGENCYS_FAIL,
    GET_ALL_AGENCYS_REQUEST,
    GET_ALL_AGENCYS_RESET,
    GET_ALL_AGENCYS_SUCCESS,
    UPDATE_AGENCY_FAIL,
    UPDATE_AGENCY_REQUEST,
    UPDATE_AGENCY_SUCCESS,
} from '../constants/agency';
import axios from 'axios';

import env from '../env.json';
export const getAllAgencys = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_AGENCYS_REQUEST,
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
            env.BASE_HOST + `/agency/getAll?page=${page}&limit=${limit}`,
            config
        );
        dispatch({
            type: GET_ALL_AGENCYS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_AGENCYS_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

// export const getAllAgencyRequests = (page, limit) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: GET_ALL_AGENCY_REQUESTS_REQUEST,
//         });

//         const {
//             login: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.auth_token}`,
//             },
//         };

//         const { data } = await axios.get(
//             env.BASE_HOST + `/agency/getAll?page=${page}&limit=${limit}`,
//             config
//         );
//         dispatch({
//             type: GET_ALL_AGENCY_REQUESTS_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_ALL_AGENCY_REQUESTS_FAIL,
//             payload: error.response.data.error || error.response.data.errors,
//         });
//     }
// };

export const getAgency = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_AGENCY_REQUEST,
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
            env.BASE_HOST + `/agency/getAgency/${id}`,
            config
        );
        dispatch({
            type: GET_AGENCY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_AGENCY_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const addAgency = (body) => async (dispatch, getState) => {
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }
    console.log(body);
    try {
        dispatch({
            type: ADD_AGENCY_REQUEST,
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
            env.BASE_HOST + '/agency/create',
            body,
            config
        );

        if (data) {
            dispatch({
                type: ADD_AGENCY_SUCCESS,
                payload: data,
            });
            dispatch({
                type: GET_ALL_AGENCYS_RESET,
            });
        }
    } catch (error) {
        dispatch({
            type: ADD_AGENCY_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const updateAgency = (id, body) => async (dispatch, getState) => {
    for (let key in body) {
        if (body[key] === '') {
            body[key] = undefined;
        }
    }
    console.log(body);

    try {
        dispatch({
            type: UPDATE_AGENCY_REQUEST,
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
            env.BASE_HOST + `/agency/${id}`,
            body,
            config
        );

        if (data.success) {
            dispatch({
                type: UPDATE_AGENCY_SUCCESS,
                payload: data.agency,
            });
            dispatch({
                type: GET_ALL_AGENCYS_RESET,
            });
        } else {
            dispatch({
                type: UPDATE_AGENCY_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_AGENCY_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};

export const deleteAgency = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_AGENCY_REQUEST,
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
            env.BASE_HOST + `/agency/${id}`,
            config
        );

        if (data.success) {
            dispatch({
                type: DELETE_AGENCY_SUCCESS,
                payload: data.agency,
            });
            setTimeout(() => {
                dispatch({ type: DELETE_AGENCY_RESET });
                dispatch({
                    type: GET_ALL_AGENCYS_RESET,
                });
            }, 600);
        } else {
            dispatch({
                type: DELETE_AGENCY_FAIL,
                payload: data.error,
            });
        }
    } catch (error) {
        dispatch({
            type: DELETE_AGENCY_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};
