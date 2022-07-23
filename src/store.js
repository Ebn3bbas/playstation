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
    addSessionReducer,
    deleteSessionReducer,
    getAllSessionsReducer,
    getSessionReducer,
    updateSessionReducer,
} from './reducers/sessions';
import { getAllStoreReducer } from './reducers/store';

import {
    addDeviceReducer,
    deleteDeviceReducer,
    getDeviceReducer,
    getAllDevicesReducer,
    updateDeviceReducer,
} from './reducers/device';
import { creatSettingsReducer } from './reducers/settings';

const reducer = combineReducers({
    allUsers: getAllUsersReducer,
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
    updateUser: updateUserReducer,
    addUser: addUserReducer,
    deleteUser: deleteUserReducer,
    getUser: getUserReducer,

    //settings
    creatsettings: creatSettingsReducer,
    //  rooms
    allSessions: getAllSessionsReducer,
    getSession: getSessionReducer,
    updateSession: updateSessionReducer,
    addSession: addSessionReducer,
    deleteSession: deleteSessionReducer,
    // Devices
    allDevices: getAllDevicesReducer,
    getDevice: getDeviceReducer,
    updateDevice: updateDeviceReducer,
    addDevice: addDeviceReducer,
    deleteDevice: deleteDeviceReducer,
    // store
    allStores: getAllStoreReducer,
});

const userInfoFormStorge = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    login: {
        userInfo: userInfoFormStorge,
    },
};

const middlewares = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
