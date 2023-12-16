import { CLEAR_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../../constants/details";
import { TIngredient } from "../../types/data";
// export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
// export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';
export interface ISetIngredient {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly payload: TIngredient;
}
export interface IClearIngredient {
    readonly type: typeof CLEAR_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions = 
| ISetIngredient
| IClearIngredient;

export function setCurrent(ingredient: TIngredient): ISetIngredient {
    return {
        type: SET_CURRENT_INGREDIENT,
        payload: ingredient
    }
}

export function clearCurrent(): IClearIngredient {
    return {
        type: CLEAR_CURRENT_INGREDIENT,
    }
}