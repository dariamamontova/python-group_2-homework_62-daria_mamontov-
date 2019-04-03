import axios from "axios";
import {HALLS_URL} from "../../api-urls";
export const HALL_ADD_REQUEST = "HALL_ADD_REQUEST";
export const HALL_ADD_SUCCESS = "HALL_ADD_SUCCESS";
export const HALL_ADD_ERROR = "HALL_ADD_ERROR";


const gatherFormData = (hall) => {
    let formData = new FormData();
    Object.keys(hall).forEach(key => {
        const value = hall[key];
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


export const addHall = (hall, authToken) => {
    return dispatch => {
        const url = HALLS_URL;
        const formData = gatherFormData(hall);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };
        dispatch({type: HALL_ADD_REQUEST});
        return axios.post(url, formData, options).then(response => {
            console.log(response);
            return dispatch({type: HALL_ADD_SUCCESS, hall: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            return dispatch({type: HALL_ADD_ERROR, errors: error.response.data});
        });
    }
};
