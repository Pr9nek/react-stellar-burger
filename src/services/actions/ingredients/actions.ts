import {
    getData
} from '../../../utils/api';
import { INGREDIENTS_LOADING, INGREDIENTS__LOAD_SUCCESS, INGREDIENTS_ERROR, SWITCHTAB } from '../../constants/ingredients';
import { TIngredient } from '../../types/data';

export interface IIngredientsLoading {
    readonly type: typeof INGREDIENTS_LOADING;
}
export interface IIngredientsSuccess {
    readonly type: typeof INGREDIENTS__LOAD_SUCCESS;
    readonly payload: TIngredient[];
}

export interface IIngredientsError {
    readonly type: typeof INGREDIENTS_ERROR;
    readonly payload: string;
}

export interface ISwitchTab {
    readonly type: typeof SWITCHTAB;
    readonly payload: string;
}

export type TIngredientsActions =
| IIngredientsLoading
| IIngredientsSuccess
| IIngredientsError
| ISwitchTab;

export function switchTab (tab: string): ISwitchTab {
    return {
        type: SWITCHTAB, 
        payload: tab,
    }
}

export const getIngredients = (payload) => (dispatch) => {

    dispatch({
        type: INGREDIENTS_LOADING
    });
    return getData()
        .then((res) => {
            dispatch({
                type: INGREDIENTS__LOAD_SUCCESS,
                payload: res.data,
            });
        })
        .catch(error => {
            dispatch({
                type: INGREDIENTS_ERROR,
                payload: error
            })
        });
};