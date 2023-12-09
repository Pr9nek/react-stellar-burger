import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;


