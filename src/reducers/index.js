import initialState from './initialState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    FETCH_MOVIES, REQUEST_MOVIES, USER_LOGOUT
} from '../actions/actionTypes';


const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case REQUEST_MOVIES:
            return {
                ...state,
                loading: action.loading,
                isAuthenticated: action.isAuthenticated
            };

        case FETCH_MOVIES:
            return {
                ...state,
                loading: action.loading,
                moviesListGlobal: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                moviesListGlobal: null,
                isAuthenticated:false
            };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
    whiteList: rootReducer
}
export default persistReducer(persistConfig, rootReducer);

