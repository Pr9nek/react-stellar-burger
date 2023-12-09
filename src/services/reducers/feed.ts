import {
    FEED_WS_CONNECTING,
    FEED_WS_ERROR,
    FEED_WS_OPEN,
    FEED_WS_CLOSE,
    FEED_WS_GET_FEED
} from "../constants/feed";
import { TOrder } from "../types/data";
import { TFeedActions } from "../actions/feed/actions";

type TFeedState = {
    isLoading: boolean;
    feedConnected: boolean;
    error: null | string;
    orders: TOrder[] | [];
    total: number | null;
    totalToday: number | null;
}

const initialFeedState: TFeedState = {
    isLoading: false,
    feedConnected: false,
    error: null,
    orders: [],
    total: null,
    totalToday: null
}

export const feedReducer = (state = initialFeedState, action: TFeedActions): TFeedState => {
    switch (action.type) {
        case FEED_WS_CONNECTING:
            return {
                ...state,
                isLoading: true,
            };
        case FEED_WS_OPEN:
            return {
                ...state,
                isLoading: false,
                feedConnected: true,
            };
        case FEED_WS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case FEED_WS_GET_FEED:
            return {
                ...state,
                feedConnected: true,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        case FEED_WS_CLOSE:
            return {
                ...state,
                feedConnected: false,
        };
        default:
            return state;
    };
};