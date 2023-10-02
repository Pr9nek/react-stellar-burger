import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
/* import { useState } from "react"; */
import { cardPropType } from "../../../utils/prop-types";
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
export default function Card({ ingredient }) {

    /* const [openModal, setOpenModal] = useState(false); */
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: {ingredient},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    /* const add = (ingredient) => {
        ingredient.type === "bun" ?
        dispatch({
            type: 'ADD_BUN_TO_CONSTRUCTOR', payload: ingredient
            }) :
            dispatch({
                type: 'ADD_INGREDIENT_TO_CONSTRUCTOR', payload: ingredient   
            })
    } */

    return (
        <>
            {!isDrag && 
            <div className={`${CardStyle.card} pl-4 pr-4`} ref={dragRef} onClick={() => {
                /* setOpenModal(true); */
                dispatch({
                    type: 'SET_CURRENT_INGREDIENT', 
                    payload: ingredient
                });
                /* add(ingredient); */
            }}>
                <img alt={ingredient.name} src={ingredient.image} className="pl-4 pr-4" />
                <div className={`${CardStyle.price} pb-1 pt-1`}>
                    <p className="text text_type_digits-default pr-2 ">{ingredient.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{ingredient.name}</p>
                {ingredient.count && <Counter count={ingredient.count} size="default" extraClass="m-1" className={CardStyle.counter} />}
            </div>}
        </>
    )
}

Card.propTypes = cardPropType;