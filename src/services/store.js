import { configureStore } from '@reduxjs/toolkit';
import {ingredientsReducer, ingredientDetailsReducer, burgerConstructorReducer} from './reducers/reducers';

export const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      details: ingredientDetailsReducer,
      burgerConstructor: burgerConstructorReducer
    },
  });