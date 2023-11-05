import {
    setRegistration,
    logIn,
    getUserRefresh
} from '../../../utils/api';

export const CHECK_USER_REGISTRATION = 'CHECK_USER_REGISTRATION';
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_REG_FAILED = 'USER_REG_FAILED';

export const CHECK_USER_LOGIN = 'CHECK_USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

// export const setAuthChecked = (value) => ({
//     type: SET_AUTH_CHECKED,
//     payload: value,
// });

// export const setUser = (user) => ({
//     type: SET_USER,
//     payload: user,
// });

export const checkUserAuth = () => (dispatch) => {
    return getUserRefresh()
        .then(res => {
         dispatch({
                type: SET_USER,
                payload: res.user,
            });
        })
        .catch(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({
                type: SET_USER,
                payload: null,
            });
        })
        .finally(() => dispatch({
            type: SET_AUTH_CHECKED,
            payload: true,
        }));
    };


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