import {
    setRegistration, logIn
} from '../../../utils/api'

export const CHECK_USER_REGISTRATION = 'CHECK_USER_REGISTRATION';
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_REG_FAILED = 'USER_REG_FAILED';

export const CHECK_USER_LOGIN = 'CHECK_USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const logInUser = (email, password) => (dispatch) => {
    dispatch({
        type: CHECK_USER_LOGIN
    });
    return logIn(email, password)
        .then(res => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            localStorage.setItem('accessToken', accessToken); 
            localStorage.setItem('refreshToken', refreshToken); 
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
            })
        });
}

export const setUserRegistration = (email, password, name) => (dispatch) => {
    dispatch({
        type: CHECK_USER_REGISTRATION
    });
    return setRegistration(email, password, name)
        .then(res => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            localStorage.setItem('accessToken', accessToken); 
            localStorage.setItem('refreshToken', refreshToken); 
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