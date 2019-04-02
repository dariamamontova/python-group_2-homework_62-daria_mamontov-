import axios from "axios";
import {MOVIES_URL} from "../../api-urls";
export const MOVIE_EDIT_REQUEST = "MOVIE_EDIT_REQUEST";
export const MOVIE_EDIT_SUCCESS = "MOVIE_EDIT_SUCCESS";
export const MOVIE_EDIT_ERROR = "MOVIE_EDIT_ERROR";
export const MOVIE_LOAD_SUCCESS = "MOVIE_LOAD_SUCCESS";


export const loadMovie = (id) => {
    return dispatch => {
        axios.get(MOVIES_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: MOVIE_LOAD_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};


const gatherFormData = (movie) => {
    let formData = new FormData();
    Object.keys(movie).forEach(key => {
        const value = movie[key];
        if (value) {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        }
    });
    return formData;
};


export const saveMovie = (movie, authToken) => {
    return dispatch => {
        const url = MOVIES_URL + movie.id + '/';
        const formData = gatherFormData(movie);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: MOVIE_EDIT_REQUEST});
        return axios.put(url, formData, options).then(response => {
            console.log(response);
            return dispatch({type: MOVIE_EDIT_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: MOVIE_EDIT_ERROR, errors: error.response.data});
        });
    }
};
