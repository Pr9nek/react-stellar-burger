import { RootState } from "../services/types";

export const getIngredientsSelector = (store: RootState) => store.ingredients.ingredients;
export const getUserSelector = (store: RootState) => store.user.user;
export const getBurgerConstructorStore = (store: RootState) => store.burgerConstructor;
export const getFeedSelector = (store: RootState) => store.feed;
export const getOrderDataOrderSelector = (store: RootState) => store.orderData.order;
export const getOrderDataIsLoadingSelector = (store: RootState) => store.orderData.isLoading;
export const getCurrentTabSelector = (store: RootState)  => store.ingredients.currentTab;
export const getBurgerConstructorSelector = (store: RootState) => store.burgerConstructor;
export const getUserNameSelector = (store: RootState) => store.user.user?.name; 
export const getUserEmailSelector = (store: RootState) => store.user.user?.email; 
export const getAuthSelector = (store: RootState) => store.user.isAuthChecked;
export const getIngredientsStore = (store: RootState) => store.ingredients;

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