import {HALLS_URL, SHOWS_URL} from "../../api-urls";
import axios from "axios";
import moment from 'moment';

export const HALL_DETAIL_REQUEST_SUCCESS = "HALL_DETAIL_REQUEST_SUCCESS";
export const SHOWS_HALL_REQUEST_SUCCESS = "SHOWS_HALL_REQUEST_SUCCESS";

export const loadHall = (id) => {
    return dispatch => {
        axios.get(HALLS_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: HALL_DETAIL_REQUEST_SUCCESS, hall: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};

export const loadShows = (hallId) => {
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        return dispatch => {
            axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            return dispatch({type: SHOWS_HALL_REQUEST_SUCCESS, shows: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };
        }