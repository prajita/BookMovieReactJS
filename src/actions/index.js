import {
    fetchMoviesApi
} from '../utils/fetchDetails';

import {
    FETCH_MOVIES,
    REQUEST_MOVIES
} from './actionTypes';

export const requestMovies = () => {
    return {
        type: REQUEST_MOVIES,
        loading: true
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
