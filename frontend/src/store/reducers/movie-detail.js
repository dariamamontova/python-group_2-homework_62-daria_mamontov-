import {MOVIE_DETAIL_REQUEST_SUCCESS, SHOWS_MOVIE_REQUEST_SUCCESS} from "../actions/movie-detail";

const initialState = {
    movie: null,
    shows: null
};

const movieDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_DETAIL_REQUEST_SUCCESS:
            return {...state, movie: action.movie};
        case SHOWS_MOVIE_REQUEST_SUCCESS:
             return {...state, shows: action.shows};
        default:
            return state;
    }
};

export default movieDetailReducer;