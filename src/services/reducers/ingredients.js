import {
    INGREDIENTS_LOADING,
    INGREDIENTS__LOAD_SUCCESS,
    INGREDIENTS_ERROR,
    SWITCHTAB
} from '../actions/ingredients/actions';

const initialState = {
    isLoading: false,
    error: null,
    ingredients: null,
    currentTab: 'Булки'
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
        case SWITCHTAB:
            return {
                ...state,
                currentTab: action.payload,
            }
        default:
            return state;
    };
};