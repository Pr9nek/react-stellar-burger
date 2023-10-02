import { configureStore } from '@reduxjs/toolkit';
import { orderReducer} from './reducers/orderData';
import { ingredientsReducer } from './reducers/ingredients';
import { ingredientDetailsReducer } from './reducers/details';
import { burgerConstructorReducer } from './reducers/burgerConstructor';

export const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      details: ingredientDetailsReducer,
      burgerConstructor: burgerConstructorReducer,
      orderData: orderReducer,
    },
  });