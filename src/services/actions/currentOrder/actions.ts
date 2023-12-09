import { getOrderWithNumber } from "../../../utils/api";
import { SET_CURRENT_ORDER, CLEAR_CURRENT_ORDER, SET_CURRENT_ORDER_ERROR } from "../../constants/currentOrder";
import { TOrder } from "../../types/data";

// export const SET_CURRENT_ORDER= 'SET_CURRENT_INGREDIENT';
// export const CLEAR_CURRENT_ORDER= 'CLEAR_CURRENT_INGREDIENT';
// export const SET_CURRENT_ORDER_ERROR = "SET_CURRENT_ORDER_ERROR";

export interface ISetCurrentAction {
    readonly type: typeof SET_CURRENT_ORDER;
    readonly payload: TOrder;
}
export interface IClearCurrentAction {
    readonly type: typeof CLEAR_CURRENT_ORDER;
}
export interface ISetErrorAction {
    readonly type: typeof SET_CURRENT_ORDER_ERROR;
    readonly payload: string;
}

export function setCurrent(order: TOrder): ISetCurrentOrderAction {
    return {
        type: SET_CURRENT_ORDER,
        payload: order
    }
}

export function clearCurrentOrder(): IClearCurrentOrderAction {
    return {
        type: CLEAR_CURRENT_ORDER,
    }
}

export type TCurrentOrderActions =
| ISetCurrentAction
| IClearCurrentAction
| ISetErrorAction;

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