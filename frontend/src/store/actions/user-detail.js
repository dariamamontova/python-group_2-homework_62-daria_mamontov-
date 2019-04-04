import {USERS_URL} from "../../api-urls";
import axios from "axios";

export const USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS";



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

