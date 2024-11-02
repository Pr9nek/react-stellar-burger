import { Middleware, MiddlewareAPI } from "redux";
import { TwsActions } from "../types";

export const socketMiddleware = (wsActions: TwsActions): Middleware => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let wsUrl: string = '';
        const RECONNECT_DELAY = 3000;
        
        // Функция для создания нового подключения
        const connect = (url: string) => {
            if (socket) {
                socket.close();
            }
            socket = new WebSocket(url);
            wsUrl = url;
            isConnected = true;
            store.dispatch({ type: wsActions.wsConnecting });
        };

        // Функция для переподключения
        const reconnect = () => {
            if (!isConnected || !wsUrl) return;
            
            clearTimeout(reconnectTimer);
            reconnectTimer = window.setTimeout(() => {
                connect(wsUrl);
            }, RECONNECT_DELAY);
        };
        
        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
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

            if (type === wsConnect && payload) {
                connect(payload);
            }

            if (socket) {
                // Устанавливаем обработчики только если их еще нет
                if (!socket.onopen) {
                    socket.onopen = () => {
                        dispatch({ type: onOpen });
                    };
                }

                if (!socket.onerror) {
                    socket.onerror = event => {
                        console.error('WebSocket error:', event);
                        dispatch({ type: onError, payload: 'WebSocket error' });
                        reconnect();
                    };
                }

                if (!socket.onmessage) {
                    socket.onmessage = event => {
                        try {
                            const parsedData = JSON.parse(event.data);
                            if (parsedData.message === "Invalid or missing token") {
                                reconnect();
                            } else {
                                dispatch({ type: onMessage, payload: parsedData });
                            }
                        } catch (err) {
                            console.error('Failed to parse message:', err);
                            dispatch({ type: onError, payload: 'Invalid message format' });
                        }
                    };
                }

                if (!socket.onclose) {
                    socket.onclose = event => {
                        console.log('WebSocket closed with code:', event.code);
                        dispatch({ type: onClose });
                        
                        // Переподключаемся только если это не было намеренное закрытие
                        if (event.code !== 1000 && isConnected) {
                            dispatch({ type: onError, payload: `Connection closed (${event.code})` });
                            reconnect();
                        }
                    };
                }

                if (type === wsSendMessage && socket.readyState === WebSocket.OPEN) {
                    try {
                        socket.send(JSON.stringify(payload));
                    } catch (err) {
                        console.error('Failed to send message:', err);
                        dispatch({ type: onError, payload: 'Failed to send message' });
                    }
                }

                if (type === wsDisconnect) {
                    isConnected = false;
                    clearTimeout(reconnectTimer);
                    socket.close(1000, 'Deliberate disconnection');
                    socket = null;
                    wsUrl = '';
                }
            }

            next(action);
        };
    };
};