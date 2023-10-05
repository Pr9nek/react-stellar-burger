import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { cardPropType } from "../../../utils/prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useMemo } from 'react';
export default function Card({ ingredient }) {

    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const constructorItems = useSelector(store => store.burgerConstructor);
    const { bun, ingredients } = constructorItems;

    const counter = useMemo(
        () => () => {
            return bun && bun._id === ingredient._id ? 2 : ingredients.filter((item) => item._id === ingredient._id).length;
        },
        [ingredient._id, bun, ingredients] 
    );

    return (
        <>
            {!isDrag &&
                <div className={`${CardStyle.card} pl-4 pr-4`} ref={dragRef} onClick={() => {
                    dispatch({
                        type: 'SET_CURRENT_INGREDIENT',
                        payload: ingredient
                    });
                }}>
                    <img alt={ingredient.name} src={ingredient.image} className="pl-4 pr-4" />
                    <div className={`${CardStyle.price} pb-1 pt-1`}>
                        <p className="text text_type_digits-default pr-2 ">{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{ingredient.name}</p>
                    {counter() > 0 && <Counter count={counter()} size="default" extraClass="m-1" className={CardStyle.counter} />}
                </div>}
        </>
    )
}

Card.propTypes = cardPropType;