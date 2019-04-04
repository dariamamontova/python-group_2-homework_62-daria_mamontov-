import {MOVIE_LIST_REQUEST_SUCCESS, MOVIE_DELETE_ERROR,
    MOVIE_DELETE_REQUEST, MOVIE_DELETE_SUCCESS} from "../actions/movie-list";


const initialState = {
    movies: [],
    errors: {}
};

const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LIST_REQUEST_SUCCESS:
            return {...state, movies: action.movies};
        case MOVIE_DELETE_REQUEST:
            return {...state, errors: {}, loading: true};
        case MOVIE_DELETE_SUCCESS:
            return {...state, loading: false};
        case MOVIE_DELETE_ERROR:
            return {...state, errors: action.errors, loading: false};
        default:
            return state;
    }
};

export default movieListReducer;