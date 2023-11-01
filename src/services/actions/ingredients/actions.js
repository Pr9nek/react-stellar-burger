import {
    getData
} from '../../../utils/api';

export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS__LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';
export const SWITCHTAB = 'SWITCHTAB';

export function switchTab (tab) {
    return {
        type: SWITCHTAB, 
        payload: tab,
    }
}

export const getIngredients = (payload) => (dispatch) => {
    console.log(123);
    dispatch({
        type: INGREDIENTS_LOADING
    });
    return getData()
        .then((res) => {
            dispatch({
                type: INGREDIENTS__LOAD_SUCCESS,
                payload: res.data,
            });
        })
        .catch(error => {
            dispatch({
                type: INGREDIENTS_ERROR,
                payload: error
            })
        });
};