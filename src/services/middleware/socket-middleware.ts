import { checkUserAuth } from "../actions/user/actions";
import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { TwsActions } from "../types";


export const socketMiddleware = (wsActions: TwsActions): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect) {
                socket = new WebSocket(action.payload);
                isConnected = true;
                dispatch({type: wsConnecting});
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                    dispatch({type: wsConnect});
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.message === "Invalid or missing token")
                    {
                        dispatch(checkUserAuth() as unknown as AnyAction);
                        dispatch({type: wsConnect});
                    }
                    else {
                        dispatch({ type: onMessage, payload: parsedData });
                    }
                };

                socket.onclose = event => {
                    if(event.code !== 1000) {
                        dispatch({type: onError, payload: event.code.toString()});
                    }
                    if(event.code !== 1005) {
                        dispatch(checkUserAuth() as unknown as AnyAction);
                        dispatch({type: wsConnect});
                    }
                    dispatch({ type: onClose });
                    if(isConnected){
                        dispatch({type: wsConnecting});
                        reconnectTimer = window.setTimeout(()=> {
                        dispatch({type: wsConnect});
                        }, 3000);
                    }
                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (type === wsDisconnect) {
                    socket.close();
                    socket = null;
                    clearTimeout(reconnectTimer);
                    isConnected = false;
                }
            }

            next(action);
        };
    };
};