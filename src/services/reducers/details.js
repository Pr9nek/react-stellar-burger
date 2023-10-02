import {
    SET_CURRENT_INGREDIENT,
    CLEAR_CURRENT_INGREDIENT
} from '../actions/details/actions';

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