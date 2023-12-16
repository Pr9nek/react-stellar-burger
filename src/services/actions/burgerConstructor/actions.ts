import { v4 as uuidv4 } from 'uuid';

import { ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, DELETE_INGREDIENT_FROM_CONSTRUCTOR, MOVE_INGREDIENT, RESET_CONSTRUCTOR_INGREDIENTS } from '../../constants/burgerConstructor';
import { TIngredient } from '../../types/data';

// export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
// export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
// export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
// export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
// export const RESET_CONSTRUCTOR_INGREDIENTS = 'RESET_CONSTRUCTOR_INGREDIENTS';

export interface IAddBunAction {
    readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
    readonly payload: TIngredient;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly payload: TIngredient;
}
export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
    readonly payload: string;
}
export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly payload: { dragIndex: number, hoverIndex: number };
}
export interface IResetConstructorAction {
    readonly type: typeof RESET_CONSTRUCTOR_INGREDIENTS;
}

export type TBurgerConstructorActions = 
    | IAddBunAction
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IMoveIngredientAction
    | IResetConstructorAction;

export function deleteItem(id: string): IDeleteIngredientAction {
    return {
        type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        payload: id,
    }
};

export function resetConstructor(): IResetConstructorAction {
    return {
        type: RESET_CONSTRUCTOR_INGREDIENTS,
    }
};

export function addIngredient(ingredient: TIngredient): IAddIngredientAction {
    return {
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        payload: { ...ingredient, id: uuidv4() },
    }
}

export function addBun(bun: TIngredient): IAddBunAction {
    return {
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: bun,
    }
}

export function moveIngredient(dragIndex: number, hoverIndex: number): IMoveIngredientAction {
    return {
        type: MOVE_INGREDIENT,
        payload: { dragIndex, hoverIndex },
    }
}