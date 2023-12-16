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

} from '../constants/user';
import { TUserActions } from '../actions/user/actions';
import { TUser } from '../types/data';

type TUserState = {
    isAuthChecked: boolean;
    user: null | TUser;

    registerUserRequest: boolean;
    registerUserError: null | string;

    loginUserRequest: boolean;
    loginUserError: null | string;

    getUserRequest: boolean;
    getUserError: null | string;

    updateUserRequest: boolean;
    updateUserError: null | string;

    logoutUserRequest: boolean;
    logoutUserError: null | string;
}

const initialUserState: TUserState = {
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

export const userReducer = (state = initialUserState, action: TUserActions): TUserState => {
    switch (action.type) {
        case SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.payload,
                getUserRequest: true
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                getUserRequest: false,
                isAuthChecked: true
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
                registerUserRequest: false,
                isAuthChecked: true
            };
        case USER_REG_FAILED:
            return {
                ...state,
                isAuthChecked: true,
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
                isAuthChecked: true,
                loginUserRequest: false
            };
        case USER_LOGIN_FAILED:
            return {
                ...state,
                isAuthChecked: true,
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
                // isAuthChecked: false,
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