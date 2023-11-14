import { getOrderWithNumber } from "../../../utils/api";

export const SET_CURRENT_ORDER= 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_ORDER= 'CLEAR_CURRENT_INGREDIENT';
export const SET_CURRENT_ORDER_ERROR = "SET_CURRENT_ORDER_ERROR";

export function setCurrent(ingredient) {
    return {
        type: SET_CURRENT_ORDER,
        payload: ingredient
    }
}

// export function clearCurrent() {
//     return {
//         type: CLEAR_CURRENT_INGREDIENT,
//     }
// }

export const setCurrentOrder = (number) => (dispatch) => {
    return getOrderWithNumber(number)
        .then (res => {
            dispatch(setCurrent(res))
        })
        .catch(error => {
            dispatch({
                type: SET_CURRENT_ORDER_ERROR,
                payload: error.message
            });
        })
};