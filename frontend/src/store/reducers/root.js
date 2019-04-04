import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import movieListReducer from "./movie-list";
import movieEditReducer from "./movie-edit";
import movieDetailReducer from "./movie-detail";
import movieAddReducer from "./movie-add";
import registerReducer from "./register";
import hallDetailReducer from "./hall-detail"
import hallAddReducer from "./hall-add";
import hallEditReducer from "./hall-edit";
import hallListReducer from "./hall-list";
import userDetailReducer from "./user-detail";
import userEditReducer from "./user-form";

const rootReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    movieList: movieListReducer,
    movieEdit: movieEditReducer,
    movieDetail: movieDetailReducer,
    movieAdd: movieAddReducer,
    register: registerReducer,
    hallDetail: hallDetailReducer,
    hallAdd: hallAddReducer,
    hallEdit: hallEditReducer,
    hallList: hallListReducer,
    userDetail: userDetailReducer,
    userEdit: userEditReducer
});

export default rootReducer;