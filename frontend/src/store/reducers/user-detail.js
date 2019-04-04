import {USER_LOAD_SUCCESS} from "../actions/user-detail";

const initialState = {
    user: {},
    errors: {}
};

const userDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOAD_SUCCESS:
            return {...state, user: action.user};
        default:
            return state;
    }
};

export default userDetailReducer;