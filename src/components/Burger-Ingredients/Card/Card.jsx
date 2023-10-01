import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Modal from "../../modals/Modal/Modal";
import { cardPropType } from "../../../utils/prop-types";
import IngredientDetails from "../../modals/Ingredient-Details/Ingredient-Details";
import { useSelector, useDispatch } from 'react-redux';
export default function Card({ ingredient }) {

    const modalka = useSelector(store => store.details.ingredientDetail);
    // это чисто чтобы проверить ingredients при срабатывании модалки закрытия

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    function closeModal() {
        setOpenModal(false);
        dispatch({type: 'CLOSE_MODAL'});
        console.log(modalka);
    }

    function add(ingredient) {
        ingredient.type === "bun" ?
        dispatch({
            type: 'ADD_BUN_TO_CONSTRUCTOR', payload: ingredient
            }) :
            dispatch({
                type: 'ADD_INGREDIENT_TO_CONSTRUCTOR', payload: ingredient   
            })
    }

    return (
        <>
            <div className={`${CardStyle.card} pl-4 pr-4`} onClick={() => {
                setOpenModal(true);
                dispatch({
                    type: 'OPEN_MODAL', 
                    payload: ingredient
                });
                add(ingredient);
            }}>
                <img alt={ingredient.name} src={ingredient.image} className="pl-4 pr-4" />
                <div className={`${CardStyle.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default pr-2 ">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{ingredient.name}</p>
                {ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1" className={CardStyle.counter} />}
            </div>
            {openModal &&

                <Modal header="Детали ингредиента" onClose={closeModal}>
                    <IngredientDetails/>
                </Modal>
            }
        </>
    )
}

Card.propTypes = cardPropType;