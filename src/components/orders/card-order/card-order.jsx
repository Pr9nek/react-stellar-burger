import styles from "./card.order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { useMemo } from "react";

export default function CardOrder() {
    const ingredients = useSelector(store => store.ingredients.ingredients);
    const { orders } = useSelector(store => store.feed);
    console.log(ingredients);
    const ingredient = useMemo(() => ingredients.filter(x => x._id === "643d69a5c3f7b9001cfa093c"), [ingredients]);
    console.log(ingredient);
    console.log(ingredient[0].name);
    console.log(orders);


    return ingredients?.length && (
        <div className={styles.container}>
            <div className={styles.card}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-medium">
                    Death Star Starship Main бургер
                </p>
                <div className={styles.ingredients}>
                    <div className={styles.imgbox}>
                        <img alt={ingredient[0].name} src={ingredient[0].image} className={styles.picture} />
                    </div>
                    <div className={`${styles.price} pb-1 pt-1`}>
                        <p className="text text_type_digits-default pr-2 ">480</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}