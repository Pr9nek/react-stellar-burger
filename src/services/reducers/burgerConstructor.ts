import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT,
    RESET_CONSTRUCTOR_INGREDIENTS
} from '../constants/burgerConstructor';
import { TBurgerConstructorActions } from '../actions/burgerConstructor/actions';
import { TIngredient } from '../types/data';

type TConstructorState = {
    bun: TIngredient | null;
    ingredients: TIngredient[] | [];

};
const initialConstructorState: TConstructorState = {
    bun: null,
    ingredients: []
}

export const burgerConstructorReducer = (state = initialConstructorState, action: TBurgerConstructorActions): TConstructorState => {
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
            };
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [...state.ingredients].filter(
                    (ingredient) => {
                        return ingredient.id !== action.payload.id;
                    }
                )
            };
        case MOVE_INGREDIENT: {
            const canDragIngredients = [...state.ingredients];
            canDragIngredients.splice(
                action.payload.dragIndex,
                0,
                canDragIngredients.splice(action.payload.hoverIndex, 1)[0]
            );

            return {
                ...state,
                ingredients: canDragIngredients
            };
        }
        case RESET_CONSTRUCTOR_INGREDIENTS:
            return initialConstructorState;

        default:
            return state;
    }
}