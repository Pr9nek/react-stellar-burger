import {
    ORDERS_WS_CONNECTING,
    ORDERS_WS_ERROR,
    ORDERS_WS_OPEN,
    ORDERS_WS_CLOSE,
    ORDERS_WS_GET_FEED
} from "../constants/profileFeed";
import { TProfileFeedActions } from "../actions/profileFeed/actions";
import { TOrder } from "../types/data";

type TProfileFeedState = {
    isLoading: boolean;
    feedConnected: boolean;
    error: null | string;
    orders: TOrder[];
    total: null | number;
    totalToday: null | number;
}

const initialProfileFeedState: TProfileFeedState = {
    isLoading: false,
    feedConnected: false,
    error: null,
    orders: [],
    total: null,
    totalToday: null
}

export const profileFeedReducer = (state = initialProfileFeedState, action: TProfileFeedActions): TProfileFeedState => {
    switch (action.type) {
        case ORDERS_WS_CONNECTING:
            return {
                ...state,
                isLoading: true,
            };
        case ORDERS_WS_OPEN:
            return {
                ...state,
                isLoading: false,
                feedConnected: true,
            };
        case ORDERS_WS_ERROR:
            return {
                ...state,
                error: action.payload,
                
            };
        case ORDERS_WS_GET_FEED:
            return {
                ...state,
                feedConnected: true,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        case ORDERS_WS_CLOSE:
            return {
                ...state,
                feedConnected: false,
        };
        default:
            return state;
    };
};