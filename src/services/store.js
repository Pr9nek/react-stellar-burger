import { configureStore } from '@reduxjs/toolkit';
import {ingredientsReducer} from './reducers/reducers';

export const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
    },
  });