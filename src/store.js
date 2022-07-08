import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    addUserReducer,
    deleteUserReducer,
    getAllUsersReducer,
    getUserReducer,
    loginReducer,
    logoutReducer,
    registerReducer,
    updateUserReducer,
} from './reducers/users';
import {
    addRoomReducer,
    deleteRoomReducer,
    getAllRoomsReducer,
    getRoomReducer,
    updateRoomReducer,
} from './reducers/sessions';
import { getAllStoreReducer } from './reducers/store';

import {
    addAgencyReducer,
    deleteAgencyReducer,
    getAgencyReducer,
    getAllAgencysReducer,
    updateAgencyReducer,
} from './reducers/device';

const reducer = combineReducers({
    allUsers: getAllUsersReducer,
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
    updateUser: updateUserReducer,
    addUser: addUserReducer,
    deleteUser: deleteUserReducer,
    getUser: getUserReducer,

    //  rooms
    allRooms: getAllRoomsReducer,
    getRoom: getRoomReducer,
    updateRoom: updateRoomReducer,
    addRoom: addRoomReducer,
    deleteRoom: deleteRoomReducer,
    // agencys
    allAgencys: getAllAgencysReducer,
    getAgency: getAgencyReducer,
    updateAgency: updateAgencyReducer,
    addAgency: addAgencyReducer,
    deleteAgency: deleteAgencyReducer,
    // store
    allStores: getAllStoreReducer,

});

// const userInfoFormStorge = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null;

const initialState = {
    // login: {
    //     userInfo: userInfoFormStorge,
    // },
};

const middlewares = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
