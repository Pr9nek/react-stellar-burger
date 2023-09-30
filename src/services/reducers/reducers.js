import {
    INGREDIENTS_LOADING,
    INGREDIENTS__LOAD_SUCCESS,
    INGREDIENTS_ERROR
} from '../actions/ingredients/actions';

import {
    OPEN_MODAL,
    CLOSE_MODAL
} from '../actions/details/actions';

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
        case OPEN_MODAL:
            return {
                ingredientDetail: action.payload
            };
        case CLOSE_MODAL:
            return {
                ingredientDetail: null
            }
            default:
                return state;
    }
}

/* const initialConstructorState = {
    bun: null,
    ingredients: []
}; */