import {
    fetchMoviesApi
} from '../utils/fetchDetails';

import {
    FETCH_MOVIES,
    REQUEST_MOVIES,
    USER_LOGOUT
} from './actionTypes';

export const requestMovies = () => {
    return {
        type: REQUEST_MOVIES,
        isAuthenticated:true,
        loading: true
    }
}
export const userLogout=()=>{
    return {
        type: USER_LOGOUT
    }
}
export const getMoviesSucess = (movies) => {
    return {
        type: FETCH_MOVIES,
        payload: movies,
        loading: false
    }
}

export const loadMovies = () => {
    return function (dispatch) {
        dispatch(requestMovies());
        fetchMoviesApi((movies) => {
            dispatch(getMoviesSucess(movies));
        });
    }
}

export const logoutState=()=>{
    return function(dispatch){
        dispatch(userLogout());
    }
}
