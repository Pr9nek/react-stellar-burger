import {
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER,
    SET_CURRENT_ORDER_ERROR
} from "../actions/currentOrder/actions";
const initialOrderState = {
    current: null,
    error: null
}

export const currentOrderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case SET_CURRENT_ORDER:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT_ORDER:
            return {
                ...state,
                current: null
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