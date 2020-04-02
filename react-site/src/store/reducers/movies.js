import {
    TOGGLE_SEARCHING_STATUS,
    SAVE_FETCHED_MOVIES,
    SAVE_SIMILAR_MOVIES
} from '../actionTypes';

const initialState = {
    movies: null,
    similarMovies: null,
    isSearching: false
};

const saveFetchedMovies = (state, action) => ({
    ...state,
    movies: action.movies
});

const saveSimilarMovies = (state, action) => ({
    ...state,
    similarMovies: action.movies
});

const toggleSearchingStatus = (state, action) => ({
    ...state,
    isSearching: action.status
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_FETCHED_MOVIES: return saveFetchedMovies(state, action);
        case SAVE_SIMILAR_MOVIES: return saveSimilarMovies(state, action);
        case TOGGLE_SEARCHING_STATUS: return toggleSearchingStatus(state, action);
        default: return state;
    }
};

export default reducer;
