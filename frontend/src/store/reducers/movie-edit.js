import {MOVIE_EDIT_ERROR, MOVIE_EDIT_REQUEST, MOVIE_EDIT_SUCCESS, MOVIE_LOAD_SUCCESS} from "../actions/movie-edit";
import {CATEGORIES_REQUEST_SUCCESS} from "../actions/movie-detail";

const initialState = {
    movie: null,
    categories: null,
    errors: {}
};

const movieEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LOAD_SUCCESS:
            const categories = action.movie.categories.map(category => category.id);
            const movie = {...action.movie, categories};
            return {...state, movie};
        case CATEGORIES_REQUEST_SUCCESS:
            return {...state, categories: action.categories};
        case MOVIE_EDIT_REQUEST:
            return {...state, errors: {}};
        case MOVIE_EDIT_SUCCESS:
            return {...state, movie: action.movie};
        case MOVIE_EDIT_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default movieEditReducer;