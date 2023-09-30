import {
    INGREDIENTS_LOADING,
    INGREDIENTS__LOAD_SUCCESS,
    INGREDIENTS_ERROR
} from '../actions/ingredients/actions';

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
                isloading: true
            };
        case INGREDIENTS__LOAD_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                    isloading: false,
            };

        case INGREDIENTS_ERROR:
            return {
                ...state,
                error: action.payload,
                    isloading: false,
            };
            default:
                return state;
    };
};