import axios from 'axios';
import {
    GET_ALL_RESELLERS_FAIL,
    GET_ALL_RESELLERS_REQUEST,
    GET_ALL_RESELLERS_SUCCESS,
} from '../constants/resellers';
import env from '../env.json';
const url = env.BASE_HOST;
export const getAllResellers = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_RESELLERS_REQUEST,
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
            url + `/users/getUsers?page=${page}&limit=${limit}&role=reseller`,
            config
        );
        dispatch({
            type: GET_ALL_RESELLERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_RESELLERS_FAIL,
            payload: error.response.data.error || error.response.data.errors,
        });
    }
};
