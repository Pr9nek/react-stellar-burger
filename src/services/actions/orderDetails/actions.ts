import { makeOrderRefresh } from '../../../utils/api';
import { resetConstructor } from '../burgerConstructor/actions';
import { ORDER_LOADING, ORDER_LOAD_SUCCESS, ORDER_ERROR, CLEAR_ORDER } from '../../constants/orderDetails';
import { AppThunk } from '../../types';

export interface IOrderLoading {
    readonly type: typeof ORDER_LOADING;
}
export interface IOrderSuccess {
    readonly type: typeof ORDER_LOAD_SUCCESS;
    readonly payload: string;
}
export interface IOrderError{
    readonly type: typeof ORDER_ERROR;
    readonly payload: string;
}
export interface IClearOrder{
    readonly type: typeof CLEAR_ORDER;
}

export type TOrderDetailsActions = 
| IOrderLoading
| IOrderSuccess
| IOrderError
| IClearOrder;

export function clearOrder(): IClearOrder {
    return {
        type: CLEAR_ORDER
    }
}

export function makeOrderSuccess(orderNumber: string): IOrderSuccess {
    return {
        type: ORDER_LOAD_SUCCESS,
        payload: orderNumber
    }
}

export const getOrder: AppThunk = (IDs: string[]) => (dispatch) => {
    dispatch({
        type: ORDER_LOADING
    });
    return makeOrderRefresh(IDs)
        .then((res) => {
            dispatch(makeOrderSuccess(res.order.number));
        })
        .then(() => {
            dispatch(resetConstructor());
        })
        .catch(error => {
            dispatch({
                type: ORDER_ERROR,
                payload: error
            })
        });
};
