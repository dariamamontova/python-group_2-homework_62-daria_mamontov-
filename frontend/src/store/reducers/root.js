import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieListReducer from "./movie-list";
import movieEditReducer from "./movie-edit";
import movieDetailReducer from "./movie-detail";
import movieAddReducer from "./movie-add"

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    movieDetail: movieDetailReducer,
    movieAdd: movieAddReducer
});

export default rootReducer;