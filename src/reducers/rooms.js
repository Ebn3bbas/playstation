import {
    ADD_ROOM_FAIL,
    ADD_ROOM_REQUEST,
    ADD_ROOM_RESET,
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
    GET_ROOM_RESET,
    GET_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_RESET,
    UPDATE_ROOM_SUCCESS,
} from '../constants/rooms';

export const getAllRoomsReducer = (state = { rooms: null }, action) => {
    switch (action.type) {
        case GET_ALL_ROOMS_REQUEST:
            return { loading: true };
        case GET_ALL_ROOMS_SUCCESS:
            return { loading: false, rooms: action.payload };
        case GET_ALL_ROOMS_FAIL:
            return { loading: false, error: action.payload };
        case GET_ALL_ROOMS_RESET:
            return { rooms: null };
        default:
            return state;
    }
};

export const getRoomReducer = (state = { room: null }, action) => {
    switch (action.type) {
        case GET_ROOM_REQUEST:
            return { loading: true };
        case GET_ROOM_SUCCESS:
            return { loading: false, room: action.payload };
        case GET_ROOM_FAIL:
            return { loading: false, error: action.payload };
        case GET_ROOM_RESET:
            return { room: null };
        default:
            return state;
    }
};

export const addRoomReducer = (state = { room: null }, action) => {
    switch (action.type) {
        case ADD_ROOM_REQUEST:
            return { loading: true };
        case ADD_ROOM_SUCCESS:
            return { loading: false, success: true, room: action.payload };
        case ADD_ROOM_FAIL:
            return { loading: false, error: action.payload };
        case ADD_ROOM_RESET:
            return { room: null };
        default:
            return state;
    }
};

export const updateRoomReducer = (state = { room: null }, action) => {
    switch (action.type) {
        case UPDATE_ROOM_REQUEST:
            return { loading: true };
        case UPDATE_ROOM_SUCCESS:
            return { loading: false, success: true, room: action.payload };
        case UPDATE_ROOM_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_ROOM_RESET:
            return { room: null };
        default:
            return state;
    }
};

export const deleteRoomReducer = (state = { room: null }, action) => {
    switch (action.type) {
        case DELETE_ROOM_REQUEST:
            return { loading: true };
        case DELETE_ROOM_SUCCESS:
            return { loading: false, success: true, room: action.payload };
        case DELETE_ROOM_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_ROOM_RESET:
            return { room: null };
        default:
            return state;
    }
};
