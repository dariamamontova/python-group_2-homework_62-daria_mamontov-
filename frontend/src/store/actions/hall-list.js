import axios from "axios";
import {HALLS_URL} from "../../api-urls";

export const HALL_LIST_REQUEST_SUCCESS = "HALL_LIST_REQUEST_SUCCESS";
export const HALL_DELETE_REQUEST = "HALL_DELETE_REQUEST";
export const HALL_DELETE_SUCCESS = "HALL_DELETE_SUCCESS";
export const HALL_DELETE_ERROR = "HALL_DELETE_ERROR";


export const loadHalls = () => {
    return dispatch => {
        axios.get(HALLS_URL)
            .then(response => {
                console.log(response.data);
                return dispatch({type: HALL_LIST_REQUEST_SUCCESS, halls: response.data});
            })
            .catch(error => console.log(error));
    }
};

export const hallDelete = (id, token) => {
    return dispatch => {
        const url = HALLS_URL + id + '/';
        const options = {
            headers: {'Authorization': 'Token ' + token}
        };
        dispatch({type: HALL_DELETE_REQUEST});
        return axios.delete(url, options).then(response => {
            console.log(response);
            return dispatch({type: HALL_DELETE_SUCCESS});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: HALL_DELETE_ERROR, errors: error.response.data});
        });
    }
}