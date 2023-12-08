import {makeOrder} from '../../../utils/api';
import { makeOrderRefresh } from '../../../utils/api';
import { resetConstructor } from '../burgerConstructor/actions';

export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER__LOAD_SUCCESS = 'ORDER__LOAD_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export function clearOrder() {
    return {
        type: CLEAR_ORDER
    }
}

export const getOrder = (IDs) => (dispatch) => {
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
