import { v4 as uuidv4 } from 'uuid';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const RESET_CONSTRUCTOR_INGREDIENTS = 'RESET_CONSTRUCTOR_INGREDIENTS';


export function deleteItem(id) {
    return {
        type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        payload: id,
    }
};

export function resetConstructor () {
    return {
        type: RESET_CONSTRUCTOR_INGREDIENTS,
    }
};

export function addIngredient(ingredient) {
    return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: { ...ingredient, id: uuidv4()},
    }
}

export function addBun(bun) {
    return {
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: bun,
    }
}

export function moveIngredient(dragIndex, hoverIndex) {
    return {
        type: MOVE_INGREDIENT,
        payload: { dragIndex, hoverIndex },
    }
}