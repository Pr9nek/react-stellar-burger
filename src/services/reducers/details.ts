import {
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
} from '../constants/details';
import { TIngredient } from '../types/data';
import { TCurrentIngredientActions } from '../actions/details/actions';

type TIngredientState = {
    readonly ingredientDetail: null | TIngredient;
};

const initialDetailState: TIngredientState = {
    ingredientDetail: null
}

export const ingredientDetailsReducer = (state = initialDetailState, action: TCurrentIngredientActions): TIngredientState => {
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