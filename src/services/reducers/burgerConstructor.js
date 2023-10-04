import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    MOVE_INGREDIENT
} from '../actions/burgerConstructor/actions';

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
            };
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
            return {
                ...state,
                ingredients: [...state.ingredients].filter(
                    (item) => {
                        return item.id !== action.id;
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
            default:
                return state;
    }
}