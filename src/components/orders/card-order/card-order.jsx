import styles from "./card.order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useMemo } from "react";

export default function CardOrder({ order }) {
    const ingredients = useSelector(store => store.ingredients.ingredients);

    const orderIngredients = useMemo(() =>
        order?.ingredients.map((ingredientId) =>
            ingredients?.find((ingredient) =>
                ingredientId === ingredient._id
            ))
        , [order?.ingredients, ingredients]);

    console.log(orderIngredients);
    const sliced = orderIngredients.slice(6).length;
    console.log(sliced);

    const orderPrice = useMemo(() =>
        orderIngredients.reduce((acc, i) => acc + i.price, 0)
        , [orderIngredients]);

    return (
        <>
            <div className={styles.card}>
                <p className="text text_type_digits-default">{`#0${order.number}`}</p>
                <p className="text text_type_main-medium">
                    {order.name}
                </p>

                <div className={styles.ingredients}>
                    <div className={styles.photos}>
                        {orderIngredients.map((ingredient, index) => {
                            if (index < 6) {
                                return (
                                    <div className={styles.imgbox} key={ingredient.index}>
                                        <img alt={ingredient.name} src={ingredient.image} className={styles.picture} />
                                        {index === 5 && sliced !== 0 && (<div className={styles.counter}><p className="text text_type_digits-default">{`+${sliced}`}</p></div>
                                        )}
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className={`${styles.price} pb-1 pt-1`}>
                        <p className="text text_type_digits-default pr-2 ">{orderPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>

                </div>
            </div>
        </>
    )
}