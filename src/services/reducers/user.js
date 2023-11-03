import {
    CHECK_USER_REGISTRATION,
    USER_REG_SUCCESS,
    USER_REG_FAILED,

    CHECK_USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED
} from '../actions/user/actions';

const initialUserState = {
    isAuthChecked: false,
    user: null,
    registerUserRequest: false,
    registerUserError: null,

    loginUserRequest: false,
    loginUserError: null,

    getUserRequest: false,
    getUserError: null,

    updateUserRequest: false,
    updateUserError: null,
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case CHECK_USER_REGISTRATION:
            return {
                ...state,
                isAuthChecked: true,
                registerUserRequest: true,
            };
        case USER_REG_SUCCESS:
            return {
                ...state,
                user: action.payload,
                registerUserRequest: false
            };
        case USER_REG_FAILED:
            return {
                ...state,
                registerUserError: action.payload,
                registerUserRequest: false
            };
        case CHECK_USER_LOGIN:
            return {
                ...state,
                isAuthChecked: true,
                loginUserRequest: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loginUserRequest: false
            };
            case USER_LOGIN_FAILED:
            return {
                ...state,
                loginUserError: action.payload,
                loginUserRequest: false
            };
        default:
            return state;
    };
};