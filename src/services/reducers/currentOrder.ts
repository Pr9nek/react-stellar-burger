import {
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER,
    SET_CURRENT_ORDER_ERROR
} from "../constants/currentOrder";
import { TOrder } from "../types/data";
import { TCurrentOrderActions } from "../actions/currentOrder/actions";

type TOrderState = {
    orders: [TOrder] | null;
    error: string | null;
}
const initialOrderState: TOrderState = {
    orders: null,
    error: null
}

export const currentOrderReducer = (state = initialOrderState, action: TCurrentOrderActions): TOrderState => {
    switch (action.type) {
        case SET_CURRENT_ORDER:
            return {
                ...state,
                orders: [action.payload]
            };
        case CLEAR_CURRENT_ORDER:
            return {
                ...state,
                orders: null
            };
        case SET_CURRENT_ORDER_ERROR:
            return {
                ...state,
                error: action.payload
            };
            default:
                return state;
    }
}