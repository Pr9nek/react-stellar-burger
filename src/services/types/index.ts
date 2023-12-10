import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredient } from "./data";
import { ReactNode } from "react";

export type RootState = ReturnType<typeof store.getState>;


