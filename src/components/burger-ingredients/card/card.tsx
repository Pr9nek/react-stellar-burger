import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { useLocation, Link } from "react-router-dom";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../../hooks/hooks';
import { useDrag } from "react-dnd";
import { FC, useMemo } from 'react';
import { ingredientsRoute } from "../../../utils/constants";
import { getBurgerConstructorSelector } from "../../../utils/constants";
import { ICardIngredient } from "../../../services/types";

const Card: FC<ICardIngredient> = ({ ingredient }) => {
    const location = useLocation();
    const id = ingredient['_id'];

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const constructorItems = useSelector(getBurgerConstructorSelector);
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
                <Link key={id}
                    to={`${ingredientsRoute}/${id}`}
                    className={`${CardStyle.card} pl-4 pr-4`}
                    ref={dragRef}
                    state={{ background: location }}>
                    <img alt={ingredient.name} src={ingredient.image_large} className="pl-4 pr-4" />
                    <div className={`${CardStyle.price} pb-1 pt-1`}>
                        <p className="text text_type_digits-default pr-2 ">{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{ingredient.name}</p>
                    {counter() > 0 && <Counter count={counter()} size="default" extraClass="m-1" />}
                </Link>}
        </>
    )
}

export default Card;
