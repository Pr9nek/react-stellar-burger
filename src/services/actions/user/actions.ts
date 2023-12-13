import {
    setRegistration,
    logIn,
    getUserRefresh,
    logOut,
    patchUserRefresh
} from '../../../utils/api';
import { accessTokenString, refreshTokenString } from '../../../utils/constants';
import { TUser } from '../../types/data';
import { CHECK_USER_REGISTRATION, USER_REG_SUCCESS, USER_REG_FAILED, CHECK_USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, SET_AUTH_CHECKED, GET_USER, GET_USER_ERROR, CHEK_USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from '../../constants/user';
import { AppThunk } from '../../types';

export interface ICheckUserRegistration {
    readonly type: typeof CHECK_USER_REGISTRATION;
}
export interface IRegistrationSuccess {
    readonly type: typeof USER_REG_SUCCESS;
    readonly payload: TUser;
}
export interface IRegistrationFailed {
    readonly type: typeof USER_REG_FAILED;
    readonly payload: string;
}
export interface ICheckUserLogin {
    readonly type: typeof CHECK_USER_LOGIN;
}
export interface ILoginSuccess {
    readonly type: typeof USER_LOGIN_SUCCESS;
    readonly payload: TUser;
}
export interface ILoginFailed {
    readonly type: typeof USER_LOGIN_FAILED;
    readonly payload: string;
}
export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean;
}
export interface IGetUser {
    readonly type: typeof GET_USER;
    readonly payload: TUser | null;
}
export interface IGetUserError {
    readonly type: typeof GET_USER_ERROR;
    readonly payload: string
}
export interface ICheckUserLogout {
    readonly type: typeof CHEK_USER_LOGOUT;
}
export interface ILogoutSuccess {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}
export interface ILogoutError{
    readonly type: typeof USER_LOGOUT_ERROR;
    readonly payload: string
}

export type TUserActions =
| ICheckUserRegistration
| IRegistrationSuccess
| IRegistrationFailed
| ICheckUserLogin
| ILoginSuccess
| ILoginFailed
| ISetAuthChecked
| IGetUser
| IGetUserError
| ICheckUserLogout
| ILogoutSuccess
| ILogoutError;

export const setAuthChecked = (value: boolean): ISetAuthChecked => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const getUser = (user: null | TUser): IGetUser => ({
    type: GET_USER,
    payload: user,
});

export const editUser: AppThunk = (name: string, email: string, password: string) => (dispatch) => {
    return patchUserRefresh(name, email, password)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_USER,
                payload: res.user,
            });
        })
        .catch(error => {
            dispatch({
                type: GET_USER_ERROR,
                payload: error.message
            });
        })
        .finally(() => dispatch({
            type: SET_AUTH_CHECKED,
            payload: true,
        }));
};

export const checkUserAuth: AppThunk = () => (dispatch: any) => {
    if (localStorage.getItem(accessTokenString)) {
        return getUserRefresh()
            .then(res => {
                dispatch({
                    type: GET_USER,
                    payload: res.user,
                });
            })
            .catch(error => {
                dispatch({
                    type: GET_USER_ERROR,
                    payload: error.message
                });
                localStorage.removeItem(accessTokenString);
                localStorage.removeItem(refreshTokenString);
                dispatch(getUser(null));
            })
            .finally(() => dispatch(setAuthChecked(true)));
    } else {
        dispatch(setAuthChecked(true));
    }
};

export const logInUser: AppThunk = (email: string, password: string) => (dispatch) => {
    dispatch({
        type: CHECK_USER_LOGIN
    });
    return logIn(email, password)
        .then(res => {
            const accessToken = res.accessToken;
            const refreshToken = res.refreshToken;
            localStorage.setItem(accessTokenString, accessToken);
            localStorage.setItem(refreshTokenString, refreshToken);
            return res;
        })
        .then((res) => {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.user
            });
        })
        .catch(error => {
            dispatch({
                type: USER_LOGIN_FAILED,
                payload: error
            });
        });
}

export const logOutUser: AppThunk = () => (dispatch) => {
    dispatch({
        type: CHEK_USER_LOGOUT
    });
    return logOut()
        .then(res => {
            dispatch({
                type: USER_LOGOUT_SUCCESS
            });
            return res;
        })
        .catch(error => {
            dispatch({
                type: USER_LOGOUT_ERROR,
                payload: error
            });
        });
};

export const setUserRegistration: AppThunk = (email: string, password: string, name: string) => (dispatch) => {
    dispatch({
        type: CHECK_USER_REGISTRATION
    });
    return setRegistration(email, password, name)
        .then(res => {
            const accessToken = res.accessToken;
            const refreshToken = res.refreshToken;
            localStorage.setItem(accessTokenString, accessToken);
            localStorage.setItem(refreshTokenString, refreshToken);
            return res;
        })
        .then((res) => {
            dispatch({
                type: USER_REG_SUCCESS,
                payload: res.user
            });
        })
        .catch(error => {
            dispatch({
                type: USER_REG_FAILED,
                payload: error
            })
        });
};