import axios from 'axios';
import {
    GET_ALL_STORES_FAIL,
    GET_ALL_STORES_REQUEST,
    GET_ALL_STORES_SUCCESS,
} from '../constants/store';
import env from '../env.json';
const url = env.BASE_HOST;
export const getAllStores = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_STORES_REQUEST,
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
            url + `/store/category?page=${page}&limit=${limit}`,
            config
        );
        dispatch({
            type: GET_ALL_STORES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_STORES_FAIL,
            payload: error.message,
        });
    }
};
