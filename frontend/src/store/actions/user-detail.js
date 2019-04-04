import {USERS_URL} from "../../api-urls";
import axios from "axios";

export const USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS";
export const USER_EDIT_REQUEST = "USER_EDIT_REQUEST";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";
export const USER_EDIT_ERROR = "USER_EDIT_ERROR";



export const loadUser = (id) => {
    return dispatch => {
            axios.get(USERS_URL + id).then(response => {
            console.log(response);
            return dispatch({type: USER_LOAD_SUCCESS, user: response.data})
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};

