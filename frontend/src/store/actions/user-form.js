import {USERS_URL} from "../../api-urls";
import axios from "axios";


export const USER_EDIT_REQUEST = "USER_EDIT_REQUEST";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";
export const USER_EDIT_ERROR = "USER_EDIT_ERROR";

export const userEdit = (user, authToken) => {
    return dispatch => {
        const url = USERS_URL + user.id + '/';
        const options = {
            headers: {
                'Authorization': 'Token ' + authToken
            }
        };
        dispatch({type: USER_EDIT_REQUEST});
        return axios.patch(url, user, options).then(response => {
            console.log(response);
            return dispatch({type: USER_EDIT_SUCCESS, user: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: USER_EDIT_ERROR, errors: error.response.data});
        });
    }
};