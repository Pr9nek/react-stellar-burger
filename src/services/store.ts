import { configureStore } from '@reduxjs/toolkit';
import { orderReducer} from './reducers/orderData';
import { ingredientsReducer } from './reducers/ingredients';
import { ingredientDetailsReducer } from './reducers/details';
import { burgerConstructorReducer } from './reducers/burgerConstructor';
import { userReducer } from './reducers/user';
import { feedReducer } from './reducers/feed';
import { currentOrderReducer } from './reducers/currentOrder';
import { profileFeedReducer } from './reducers/profileFeed';
import { socketMiddleware } from './middleware/socket-middleware';
import { FEED_CONNECT, FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_OPEN, FEED_WS_CLOSE, FEED_WS_GET_FEED, FEED_DISCONNECT } from "./constants/feed";
import { ORDERS_CONNECT, ORDERS_WS_CONNECTING, ORDERS_WS_ERROR, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_GET_FEED, ORDERS_DISCONNECT } from "./constants/profileFeed";

const feedMiddleware = socketMiddleware({
  wsConnect: FEED_CONNECT,
  wsDisconnect: FEED_DISCONNECT,
  wsConnecting: FEED_WS_CONNECTING,
  onOpen: FEED_WS_OPEN,
  onClose: FEED_WS_CLOSE,
  onError: FEED_WS_ERROR,
  onMessage: FEED_WS_GET_FEED
});

const profileFeedMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT,
  wsDisconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_GET_FEED
});

export const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      details: ingredientDetailsReducer,
      burgerConstructor: burgerConstructorReducer,
      orderData: orderReducer,
      user: userReducer,
      feed: feedReducer,
      profileFeed: profileFeedReducer,
      currentOrder: currentOrderReducer
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(feedMiddleware,profileFeedMiddleware);
  }
  });