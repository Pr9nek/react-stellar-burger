import {
    INGREDIENTS_LOADING,
    INGREDIENTS__LOAD_SUCCESS,
    INGREDIENTS_ERROR,
    SWITCHTAB
} from '../constants/ingredients';
import { TIngredientsActions } from '../actions/ingredients/actions';
import { TIngredient } from '../types/data';

type TIngredientsState = {
    isLoading: boolean;
    error: null | string;
    ingredients: TIngredient[] | null;
    currentTab: string;
};

const initialState: TIngredientsState = {
    isLoading: false,
    error: null,
    ingredients: null,
    currentTab: 'Булки'
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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