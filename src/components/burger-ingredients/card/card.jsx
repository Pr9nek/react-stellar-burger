import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";
import { useLocation, Link } from "react-router-dom";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { cardPropType } from "../../../utils/prop-types";
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useMemo } from 'react';
import { ingredientsRoute } from "../../../utils/constants";
// import { setCurrent } from '../../../services/actions/details/actions';
export default function Card({ ingredient }) {
    const location = useLocation();
    const id = ingredient['_id'];

    // const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { ingredient },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const getBurgerConstructorSelector = store => store.burgerConstructor;
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
                    // onClick={() => {
                    //     dispatch(setCurrent(ingredient));
                    // }}
                    state={{ background: location }}>
                    <img alt={ingredient.name} src={ingredient.image_large} className="pl-4 pr-4" />
                    <div className={`${CardStyle.price} pb-1 pt-1`}>
                        <p className="text text_type_digits-default pr-2 ">{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{ingredient.name}</p>
                    {counter() > 0 && <Counter count={counter()} size="default" extraClass="m-1" className={CardStyle.counter} />}
                </Link>}
        </>
    )
}

Card.propTypes = cardPropType;