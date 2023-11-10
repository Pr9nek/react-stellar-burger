import { configureStore } from '@reduxjs/toolkit';
import { orderReducer} from './reducers/orderData';
import { ingredientsReducer } from './reducers/ingredients';
import { ingredientDetailsReducer } from './reducers/details';
import { burgerConstructorReducer } from './reducers/burgerConstructor';
import { userReducer } from './reducers/user';
import { feedReducer } from './reducers/feed';
import { socketMiddleware } from './middleware/socket-middleware';
import { FEED_CONNECT, FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_OPEN, FEED_WS_CLOSE, FEED_WS_GET_FEED, FEED_DISCONNECT } from "./actions/feed/actions";

const feedMiddleware = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_GET_FEED
});

export const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      details: ingredientDetailsReducer,
      burgerConstructor: burgerConstructorReducer,
      orderData: orderReducer,
      user: userReducer,
      feed: feedReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(feedMiddleware);
  }
  });