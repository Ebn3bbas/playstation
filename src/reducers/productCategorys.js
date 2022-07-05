import {
    GET_ALL_CATEGORIES_FAIL,
    GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_RESET,
    GET_ALL_CATEGORIES_SUCCESS,
} from '../constants/productCategorys';

export const getAllCategoriesReducer = (
    state = { categories: null },
    action
) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
            return { loading: true };
        case GET_ALL_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload };
        case GET_ALL_CATEGORIES_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_CATEGORIES_RESET:
            return { categories: null };
        default:
            return state;
    }
};
