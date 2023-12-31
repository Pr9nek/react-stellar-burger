import {
    ORDER_LOADING,
    ORDER_LOAD_SUCCESS,
    ORDER_ERROR,
    CLEAR_ORDER
} from '../constants/orderDetails';
import { TOrderDetailsActions } from '../actions/orderDetails/actions';

type TOrderState = {
    readonly error: null | string;
    readonly order: string | null;
    readonly isLoading: boolean;
};

const initialOrderState: TOrderState = {
    error: null,
    order: null,
    isLoading: false
}

export const orderReducer = (state = initialOrderState, action: TOrderDetailsActions): TOrderState => {
    switch (action.type) {
        case ORDER_LOADING:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case ORDER_LOAD_SUCCESS:
            return {
                ...state,
                order: action.payload,
                isLoading: false
            };
        case ORDER_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case CLEAR_ORDER:
            return {
                ...state,
                order: null,
            }
        default:
            return state;
    };
};