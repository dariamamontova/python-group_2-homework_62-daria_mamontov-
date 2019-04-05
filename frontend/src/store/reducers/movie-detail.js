import {MOVIE_DETAIL_REQUEST_SUCCESS, SHOWS_MOVIE_REQUEST_SUCCESS, CATEGORIES_REQUEST_SUCCESS} from "../actions/movie-detail";

const initialState = {
    movie: null,
    shows: null,
    categories: null
};

const movieDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_DETAIL_REQUEST_SUCCESS:
            return {...state, movie: action.movie};
        case SHOWS_MOVIE_REQUEST_SUCCESS:
             return {...state, shows: action.shows};
        case CATEGORIES_REQUEST_SUCCESS:
            return {...state, categories: action.categories};
        default:
            return state;
    }
};

export default movieDetailReducer;