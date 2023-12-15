import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredient } from "./data";
import { TBurgerConstructorActions } from "../actions/burgerConstructor/actions";
import { TCurrentOrderActions } from "../actions/currentOrder/actions";
import { TCurrentIngredientActions } from "../actions/details/actions";
import { TFeedActions } from "../actions/feed/actions";
import { TIngredientsActions } from "../actions/ingredients/actions";
import { TOrderDetailsActions } from "../actions/orderDetails/actions";
import { TProfileFeedActions } from "../actions/profileFeed/actions";
import { TUserActions } from "../actions/user/actions";
import { FEED_CONNECT, FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_OPEN, FEED_WS_CLOSE, FEED_WS_GET_FEED, FEED_DISCONNECT } from "../constants/feed";
import { ORDERS_CONNECT, ORDERS_WS_CONNECTING, ORDERS_WS_ERROR, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_GET_FEED, ORDERS_DISCONNECT } from "../constants/profileFeed";
import { ReactNode } from "react";
import { TOrder } from "./data";
import { reducer } from "../store";

export type RootState = ReturnType<typeof reducer>;
export type TAppActions =
    | TBurgerConstructorActions
    | TCurrentOrderActions
    | TCurrentIngredientActions
    | TFeedActions
    | TIngredientsActions
    | TOrderDetailsActions
    | TProfileFeedActions
    | TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type AppDispatch = typeof store.dispatch;
export type TwsActions = {
    wsConnect: string | typeof FEED_CONNECT | typeof ORDERS_CONNECT;
    wsDisconnect: string | typeof FEED_DISCONNECT | typeof ORDERS_DISCONNECT;
    wsConnecting: string | typeof FEED_WS_CONNECTING | typeof ORDERS_WS_CONNECTING;
    onOpen: string | typeof FEED_WS_OPEN | typeof ORDERS_WS_OPEN;
    onClose: string | typeof FEED_WS_CLOSE | typeof ORDERS_WS_CLOSE;
    onError: string | typeof FEED_WS_ERROR | typeof ORDERS_WS_ERROR;
    onMessage: string | typeof FEED_WS_GET_FEED | typeof ORDERS_WS_GET_FEED;
    wsSendMessage?: string
}

export interface IModal {
    onClose: () => void;
    header?: string;
    children: ReactNode;
}

export type TDragItem = {
    index: number;
};

export interface IListItem {
    name: string; 
    price: number; 
    index: number; 
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
    id?: string;
    image: string;
}
export interface ICardIngredient {
    ingredient: TIngredient;
}
export interface ICardOrder {
    order: TOrder;
}

export interface IProtected {
    onlyUnAuth?: boolean;
    component: JSX.Element;
}

export interface INotProtected {
    component: JSX.Element;
}