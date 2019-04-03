import {HALL_DETAIL_REQUEST_SUCCESS, SHOWS_HALL_REQUEST_SUCCESS} from "../actions/hall-detail";

const initialState = {
    hall: null,
    shows: null
};

const hallDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_DETAIL_REQUEST_SUCCESS:
            return {...state, hall: action.hall};
        case SHOWS_HALL_REQUEST_SUCCESS:
             return {...state, shows: action.shows};
        default:
            return state;
    }
};

export default hallDetailReducer;