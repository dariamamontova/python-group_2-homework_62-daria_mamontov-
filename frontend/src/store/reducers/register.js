import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR} from "../actions/register";


const initialState = {
    errors: {},
    loading: false,
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {...state, errors: {}, loading: true};
        case REGISTER_SUCCESS:
            return {...state, loading: false};
        case REGISTER_ERROR:
            return {...state, errors: action.errors, loading: false};
        default:
            return state;
    }
};

export default registerReducer;