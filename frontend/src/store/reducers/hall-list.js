import {HALL_LIST_REQUEST_SUCCESS, HALL_DELETE_ERROR, HALL_DELETE_REQUEST, HALL_DELETE_SUCCESS} from "../actions/hall-list";


const initialState = {
    halls: [],
    errors: {}
};

const hallListReducer = (state = initialState, action) => {
    switch (action.type) {
        case HALL_LIST_REQUEST_SUCCESS:
            return {...state, halls: action.halls};
        case HALL_DELETE_REQUEST:
            return {...state, errors: {}, loading: true};
        case HALL_DELETE_SUCCESS:
            return {...state, loading: false};
        case HALL_DELETE_ERROR:
            return {...state, errors: action.errors, loading: false};
        default:
            return state;
    }
};

export default hallListReducer;