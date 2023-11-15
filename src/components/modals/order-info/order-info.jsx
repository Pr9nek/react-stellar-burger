import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentOrder } from "../../../services/actions/currentOrder/actions";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useMemo } from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderInfo() {
    const dispatch = useDispatch();
    const { number } = useParams();

    const current = useSelector(store => store.currentOrder.current?.orders[0]);
    const feed = useSelector(store => store.feed?.orders);

    const order = useSelector(store => {
        let order;
        order = store.feed.orders?.find((order) => order.number == number);
        if (order) {
            return order;
        }
        order = store.profileFeed.orders?.find((order) => order.number == number);
        if (order) {
            return order;
        }

        order = store.currentOrder.current?.orders.find((order) => order.number == number);
        if (order) {
            return order;
        }
    });

    console.log(current);
    console.log(feed);
    console.log(order);

    const ingredients = useSelector(store => store.ingredients.ingredients);

    const orderIngredients = useMemo(() =>
        order?.ingredients.map((ingredientId) =>
            ingredients?.find((ingredient) =>
                ingredientId === ingredient._id
            ))
        , [order?.ingredients, ingredients]);

    console.log(orderIngredients);

    useEffect(() => {
        if (!order) {
            dispatch(setCurrentOrder(number))
        }
    }, []);

    // console.log(current);

    const multiply = (ingredient) => {
        let res = orderIngredients?.filter((x) => x._id === ingredient._id);
        return res.length
    }

    const getUnique = (arr) => 
        arr?.filter((el, ind) => ind === arr.indexOf(el));
    

    const uniqueOrderIngredients = getUnique(orderIngredients);
    console.log(uniqueOrderIngredients);

    const orderPrice = useMemo(() =>
    orderIngredients?.reduce((acc, i) => acc + i.price, 0)
    , [orderIngredients]);

    if (!order) {
        return null;
    }

    return (
        <div className={styles.container}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#0${order.number}`}</p>
            {/* <p className={`${styles.number}text text_type_digits-default`}>{`#0${order.number}`}</p> */}
            <p className="text text_type_main-medium mt-10 mb-3">
                {order.name}
            </p>
            {order.status === 'done' ? (
                <p className={`${styles.statusDone} text text_type_main-default mb-15`} >
                    {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : null}
                </p>
            ) : (
                <p className="text text_type_main-default mb-15" >
                    {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : null}
                </p>
            )
            }
            <p className="text text_type_main-medium mb-6">
                Состав:
            </p>
            <div className={`${styles.cards} custom-scroll mb-10`}>
                {uniqueOrderIngredients?.map((ingredient) => (
                    <div className={styles.card} key={uuidv4()}>
                        <div className={styles.cardinfo}>
                            <div className={styles.imgbox}>
                                <img alt={ingredient.name} src={ingredient.image} className={styles.picture}></img>
                            </div>
                            <p className="text text_type_main-default">
                                {ingredient.name}
                            </p>
                        </div>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default pr-2">{`${multiply(ingredient)} х ${ingredient.price}`}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                )
                )}
            </div >
            <div className={styles.totalprice}>
            <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.createdAt)} /></p>
            <div className={styles.price}>
                            <p className="text text_type_digits-default pr-2">{orderPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
            </div>
        </div>
    )
}