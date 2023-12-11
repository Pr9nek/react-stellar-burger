import {makeOrder} from '../../../utils/api';
import { makeOrderRefresh } from '../../../utils/api';
import { resetConstructor } from '../burgerConstructor/actions';
import { ORDER_LOADING, ORDER__LOAD_SUCCESS, ORDER_ERROR, CLEAR_ORDER } from '../../constants/orderDetails';
import { AppThunk } from '../../types';

export interface IOrderLoading {
    readonly type: typeof ORDER_LOADING;
}
export interface IOrderSuccess {
    readonly type: typeof ORDER__LOAD_SUCCESS;
    readonly payload: number;
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

export const getOrder: AppThunk = (IDs: string[]) => (dispatch) => {
    dispatch({
        type: ORDER_LOADING
    });
    return makeOrderRefresh(IDs)
        .then((res) => {
            dispatch({
                type: ORDER__LOAD_SUCCESS,
                payload: res.order.number,
            });
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
