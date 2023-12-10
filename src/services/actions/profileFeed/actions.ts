import { ORDERS_CONNECT, ORDERS_WS_CONNECTING, ORDERS_WS_ERROR, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_GET_FEED, ORDERS_DISCONNECT } from "../../constants/profileFeed";
import { TWSMessage } from "../../types/data";

export interface IConnect {
    readonly type: typeof ORDERS_CONNECT;
}
export interface IDisconnect {
    readonly type: typeof ORDERS_DISCONNECT;
}
export interface IError {
    readonly type: typeof ORDERS_WS_ERROR;
    readonly payload: string;
}
export interface IConnecting {
    readonly type: typeof ORDERS_WS_CONNECTING;
}
export interface IOpen {
    readonly type: typeof ORDERS_WS_OPEN;
}
export interface IClose {
    readonly type: typeof ORDERS_WS_CLOSE;
}
export interface IGetFeed {
    readonly type: typeof ORDERS_WS_GET_FEED;
    payload: TWSMessage;
}

export type TProfileFeedActions = 
| IConnect
| IDisconnect
| IError
| IConnecting
| IOpen
| IClose
| IGetFeed;


export const connect = (url: string): IConnect => ({
    type: ORDERS_CONNECT,
    payload: url
});

export const disconnect = (): IDisconnect => ({
    type: ORDERS_DISCONNECT
});