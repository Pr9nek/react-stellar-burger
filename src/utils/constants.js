export const getIngredientsSelector = store => store.ingredients.ingredients;
export const getUserSelector = store => store.user.user;
export const getBurgerConstructorStore = store => store.burgerConstructor;
export const getFeedSelector = store => store.feed;
export const getOrderDataOrderSelector = store => store.orderData.order;
export const homeRoute = "/";
export const feedRoute = "/feed";
export const feedDynamicOrderRoute = "/feed/:number";
export const lostRoute = "*";
export const profileRoute = "/profile";
export const profileOrdersRoute = "orders";
export const loginRoute = "/login";
export const registerRoute = "/register";
export const forgotPasswordRoute = "/forgot-password";
export const resetPasswordRoute = "/reset-password";
export const dynamicIngredientRoute = "/ingredients/:id";
export const ingredientsRoute = "/ingredients";
export const profileDynamicOrderRoute = "/profile/orders/:number";
export const accessTokenString = "accessToken";
export const refreshTokenString = "refreshToken";