import {MOVIES_URL, SHOWS_URL} from "../../api-urls";
import axios from "axios";
import moment from 'moment';

export const MOVIE_DETAIL_REQUEST_SUCCESS = "MOVIE_DETAIL_REQUEST_SUCCESS";
export const SHOWS_MOVIE_REQUEST_SUCCESS = "SHOWS_MOVIE_REQUEST_SUCCESS";

export const loadMovie = (id) => {
    return dispatch => {
        axios.get(MOVIES_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: MOVIE_DETAIL_REQUEST_SUCCESS, movie: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};

export const loadShows = (movieId) => {
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`movie_id=${movieId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        return dispatch => {
            axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            return dispatch({type: SHOWS_MOVIE_REQUEST_SUCCESS, shows: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };
        }