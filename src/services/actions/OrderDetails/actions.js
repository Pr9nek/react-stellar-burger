import {makeOrder} from '../../../utils/api';

export const ORDER_LOADING = 'ORDER_LOADING';
export const ORDER__LOAD_SUCCESS = 'ORDER__LOAD_SUCCESS';
export const ORDER_ERROR = 'ORDER_ERROR';

export const getOrder = (payload, IDs) => (dispatch) => {
    dispatch({
        type: ORDER_LOADING
    });
    return makeOrder(IDs)
        .then((res) => {
            dispatch({
                type: ORDER__LOAD_SUCCESS,
                payload: res.order.number,
            });
        })
        .catch(error => {
            dispatch({
                type: ORDER_ERROR,
                payload: error
            })
        });
};
