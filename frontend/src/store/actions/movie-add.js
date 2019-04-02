import axios from "axios";
import {MOVIES_URL} from "../../api-urls";
export const MOVIE_ADD_REQUEST = "MOVIE_ADD_REQUEST";
export const MOVIE_ADD_SUCCESS = "MOVIE_ADD_SUCCESS";
export const MOVIE_ADD_ERROR = "MOVIE_ADD_ERROR";


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


export const addMovie = (movie, authToken) => {
    return dispatch => {
        const url = MOVIES_URL;
        const formData = gatherFormData(movie);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: MOVIE_ADD_REQUEST});
        return axios.post(url, formData, options).then(response => {
            console.log(response);
            return dispatch({type: MOVIE_ADD_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: MOVIE_ADD_ERROR, errors: error.response.data});
        });
    }
};
