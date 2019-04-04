import axios from "axios";
import {MOVIES_URL} from "../../api-urls";

export const MOVIE_LIST_REQUEST_SUCCESS = "MOVIE_LIST_REQUEST_SUCCESS";
export const MOVIE_DELETE_REQUEST = "MOVIE_DELETE_REQUEST";
export const MOVIE_DELETE_SUCCESS = "MOVIE_DELETE_SUCCESS";
export const MOVIE_DELETE_ERROR = "MOVIE_DELETE_ERROR";


export const loadMovies = () => {
    return dispatch => {
        axios.get(MOVIES_URL)
            .then(response => {
                console.log(response.data);
                return dispatch({type: MOVIE_LIST_REQUEST_SUCCESS, movies: response.data});
            })
            .catch(error => console.log(error));
    }
};

export const movieDelete = (id, token) => {
    return dispatch => {
        const url = MOVIES_URL + id + '/';
        const options = {
            headers: {'Authorization': 'Token ' + token}
        };
        dispatch({type: MOVIE_DELETE_REQUEST});
        return axios.delete(url, options).then(response => {
            console.log(response);
            return dispatch({type: MOVIE_DELETE_SUCCESS});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: MOVIE_DELETE_ERROR, errors: error.response.data});
        });
    }
}