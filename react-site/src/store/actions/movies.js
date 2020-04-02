import Axios from 'axios';

import {
    TOGGLE_SEARCHING_STATUS,
    SAVE_FETCHED_MOVIES,
    SAVE_SIMILAR_MOVIES
} from '../actionTypes';

// instance
const axios = Axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const apiKey = '1a67fd8fb5bbd9369d8ed3886f1ac2e2';

export const fetchMovies = search => {
    return dispatch => {
        dispatch(toggleSearchingStatus(true));

        axios.get(`/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1`)
            .then(response => {
                const { results } = response.data;

                dispatch(saveFetchedMovies(results));
            })
            .catch(error => {
                console.log('[error]', error);
            })
            .finally(() => {
                dispatch(toggleSearchingStatus(false));
            });
    };
};

export const getSimilarMovies = movieId => {
    return dispatch => {
        dispatch(toggleSearchingStatus(true));
    
        axios.get(`/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`)
            .then(response => {
                const { results } = response.data;
    
                dispatch(saveSimilarMovies(results.slice(0, 3)));
            })
            .catch(error => {
                console.log('[error]', error);
            })
            .finally(() => {
                dispatch(toggleSearchingStatus(false));
            });
    };
};

const saveSimilarMovies = movies => ({
    type: SAVE_SIMILAR_MOVIES,
    movies
});

const saveFetchedMovies = movies => ({
    type: SAVE_FETCHED_MOVIES,
    movies
});

const toggleSearchingStatus = status => ({
    type: TOGGLE_SEARCHING_STATUS,
    status
});
