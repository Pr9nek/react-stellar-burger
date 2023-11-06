import {
    setRegistration,
    logIn,
    getUserRefresh,
    logOut
} from '../../../utils/api';

export const CHECK_USER_REGISTRATION = 'CHECK_USER_REGISTRATION';
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_REG_FAILED = 'USER_REG_FAILED';

export const CHECK_USER_LOGIN = 'CHECK_USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const GET_USER = "SET_USER";
export const GET_USER_ERROR = "GET_USER_ERROR";

export const CHEK_USER_LOGOUT = "CHEK_USER_LOGOUT";
export const USER_LOGOUT_SUCCESS = "GEUSER_LOGOUT_SUCCESST_USER_ERROR";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";

export const checkUserAuth = () => (dispatch) => {
    return getUserRefresh()
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
        });
    });
}

export const logOutUser = (token) => (dispatch) => {
    dispatch({
        type: CHEK_USER_LOGOUT
    });
    return logOut(token)
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