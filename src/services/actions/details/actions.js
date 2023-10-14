export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';

export function setCurrent(ingredient) {
    return {
        type: SET_CURRENT_INGREDIENT,
        payload: ingredient
    }
}

export function clearCurrent() {
    return {
        type: CLEAR_CURRENT_INGREDIENT,
    }
}