import {USER_EDIT_SUCCESS, USER_EDIT_ERROR, USER_EDIT_REQUEST} from "../actions/user-form";

const initialState = {
    user: null,
    errors: {}
};

const userEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_EDIT_REQUEST:
            return {...state, errors: {}};
        case USER_EDIT_SUCCESS:
            return {...state, user: action.user};
        case USER_EDIT_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
}

export default userEditReducer;