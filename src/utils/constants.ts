import { store } from "../services/store";
import { RootState } from "../services/types";

export const getIngredientsSelector = store => store.ingredients.ingredients;
export const getUserSelector = store => store.user.user;
export const getBurgerConstructorStore = store => store.burgerConstructor;
export const getFeedSelector = store => store.feed;
export const getOrderDataOrderSelector = store => store.orderData.order;

export const homeRoute: string = "/";
export const feedRoute: string = "/feed";
export const feedDynamicOrderRoute: string = "/feed/:number";
export const lostRoute: string = "*";
export const profileRoute: string = "/profile";
export const profileOrdersRoute: string = "orders";
export const loginRoute: string = "/login";
export const registerRoute: string = "/register";
export const forgotPasswordRoute: string = "/forgot-password";
export const resetPasswordRoute: string = "/reset-password";
export const dynamicIngredientRoute: string = "/ingredients/:id";
export const ingredientsRoute: string = "/ingredients";
export const profileDynamicOrderRoute: string = "/profile/orders/:number";
export const accessTokenString: string = "accessToken";
export const refreshTokenString: string = "refreshToken";