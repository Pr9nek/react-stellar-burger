import {
    ADD_BUN_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR
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
            }
        default:
                return state;
    }
}