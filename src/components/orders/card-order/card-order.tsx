import styles from "./card.order.module.css";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../../hooks/hooks';
import { useMemo } from "react";
import { useMatch } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredientsSelector } from "../../../utils/constants";
import { profileRoute, profileOrdersRoute } from "../../../utils/constants";
import { ICardOrder } from "../../../services/types";
import { FC } from "react";

const CardOrder: FC<ICardOrder> = ({ order }) => {
    const ingredients = useSelector(getIngredientsSelector);
    const isProfileInfo = useMatch(`${profileRoute}/${profileOrdersRoute}`);
    const orderIngredients = useMemo(() =>
        order?.ingredients.map((ingredientId) =>
            ingredients?.find((ingredient) =>
                ingredientId === ingredient._id
            ))
        , [order?.ingredients, ingredients]);

    if (orderIngredients.includes(undefined)) {
        return null;
    }

    const sliced = orderIngredients?.slice(6).length;

    // const orderPrice = useMemo(() =>
    //     orderIngredients?.reduce((acc, i) => 
    //     // if (!i) {return null;}
    //     acc + i.price, 0)
    //     , [orderIngredients]);

    const orderPrice = () => {
        return orderIngredients?.reduce((acc, i) =>
            acc + i!.price, 0);
        } 

    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardheader}>
                    <p className="text text_type_digits-default">{`#0${order.number}`}</p>
                    <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.createdAt)} /></p>
                </div>
                <div>
                    <p className="text text_type_main-medium">
                        {order.name}
                    </p>
                    {isProfileInfo &&
                        order.status === 'done' ? (
                        <p className={`${styles.statusDone} text text_type_main-default`} >
                            {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : null}
                        </p>
                    ) : (
                        <p className="text text_type_main-default" >
                            {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : null}
                        </p>
                    )
                    }
                </div>

                <div className={styles.ingredients}>
                    <div className={styles.photos}>
                        {orderIngredients.map((ingredient, index) => {
                            if (index < 6) {
                                return (
                                    <div className={styles.imgbox} key={uuidv4()}>
                                        <img alt={ingredient!.name} src={ingredient!.image} className={styles.picture} />
                                        {index === 5 && sliced !== 0 && (<div className={styles.counter}><p className="text text_type_digits-default">{`+${sliced}`}</p></div>
                                        )}
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className={`${styles.price} pb-1 pt-1`}>
                        <p className="text text_type_digits-default pr-2 ">{orderPrice()}</p>
                        <CurrencyIcon type="primary" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default CardOrder;