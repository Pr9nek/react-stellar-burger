import { configureStore } from '@reduxjs/toolkit';
import {ingredientsReducer, ingredientDetailsReducer} from './reducers/reducers';

export const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
      details: ingredientDetailsReducer,
    },
  });