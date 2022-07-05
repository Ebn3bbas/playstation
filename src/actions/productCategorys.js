import axios from 'axios';
import {
    GET_ALL_CATEGORIES_FAIL,
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
} from '../constants/productCategorys';
import env from '../env.json';
const url = env.BASE_HOST;
export const getAllCategories = (page, limit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_CATEGORIES_REQUEST,
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
            type: GET_ALL_CATEGORIES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_CATEGORIES_FAIL,
            payload: error.message,
        });
    }
};
