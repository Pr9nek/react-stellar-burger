import {
    INGREDIENTS_LOADING,
    INGREDIENTS__LOAD_SUCCESS,
    INGREDIENTS_ERROR
} from '../actions/ingredients/actions';

import {
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
} from '../actions/details/actions';

import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR
} from '../actions/burgerConstructor/actions';

import {
    ORDER_LOADING,
    ORDER__LOAD_SUCCESS,
    ORDER_ERROR,
    CLEAR_ORDER
} from '../actions/OrderDetails/actions';

const initialState = {
    isLoading: false,
    error: null,
    ingredients: null
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INGREDIENTS_LOADING:
            return {
                ...state,
                error: null,
                    isLoading: true,
            };
        case INGREDIENTS__LOAD_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                    isLoading: false,
            };
        case INGREDIENTS_ERROR:
            return {
                ...state,
                error: action.payload,
                    isLoading: false,
            };
        default:
            return state;
    };
};

const initialDetailState = {
    ingredientDetail: null
}

export const ingredientDetailsReducer = (state = initialDetailState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT:
            return {
                ingredientDetail: action.payload
            };
        case CLEAR_CURRENT_INGREDIENT:
            return {
                ingredientDetail: null
            }
            default:
                return state;
    }
}

const initialConstructorState = {
    bun: null,
    ingredients: []
}

export const burgerConstructorReducer = (state = initialConstructorState, action) => {
    switch (action.type) {
        case ADD_BUN_TO_CONSTRUCTOR:
            return {
                ...state,
                bun: action.payload
            };
        case ADD_INGREDIENT_TO_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        default:
                return state;
    }
}

const initialOrderState = {
    error: null,
    order: null,
    isLoading: false
}

export const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        case ORDER_LOADING:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case ORDER__LOAD_SUCCESS:
            return {
                ...state,
                order: action.payload,
                isLoading: false
            };
        case ORDER_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case CLEAR_ORDER:
            return {
                ...state,
                order: null,
            }
        default:
            return state;
    };
};