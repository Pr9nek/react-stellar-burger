import {
    CHECK_USER_REGISTRATION,
    USER_REG_SUCCESS,
    USER_REG_FAILED,

    CHECK_USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,

    SET_AUTH_CHECKED,
    GET_USER,
    GET_USER_ERROR,

    CHEK_USER_LOGOUT,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_ERROR

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

    logoutUserRequest: false,
    logoutUserError: null,
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                    getUserRequest: false
            };
        case GET_USER_ERROR:
            return {
                ...state,
                getUserError: action.payload,
                    user: null
            };
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
                isAuthChecked: false,
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
                isAuthChecked: false,
                    loginUserError: action.payload,
                    loginUserRequest: false
            };
        case CHEK_USER_LOGOUT:
            return {
                ...state,
                logoutUserRequest: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthChecked: false,
                    logoutUserRequest: false,
                    user: null
            };
        case USER_LOGOUT_ERROR:
            return {
                ...state,
                logoutUserError: action.payload,
                    logoutUserRequest: false
            };
        default:
            return state;
    };
};