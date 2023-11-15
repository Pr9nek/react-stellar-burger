import styles from "./feed.module.css";
import { useSelector, useDispatch } from 'react-redux';
import Statistics from "../../components/statistics/statistics";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/feed/actions";
import CardOrder from "../../components/orders/card-order/card-order";
import { useLocation, Link } from "react-router-dom";

function Feed() {
    const dispatch = useDispatch();
    const location = useLocation();
    const ORDERS_ALL_URL = "wss://norma.nomoreparties.space/orders/all";
    useEffect(() => {
        dispatch(connect(ORDERS_ALL_URL));
        return () => {
            dispatch(disconnect(ORDERS_ALL_URL));
        }
    }, [dispatch]);

    const { isLoading, Error, orders } = useSelector(store => store.feed);
    // const order = {"_id":"65523732c2cc61001b3d794f","ingredients":["643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa0945","643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa0947","643d69a5c3f7b9001cfa093d"],"status":"done","name":"Space флюоресцентный фалленианский антарианский метеоритный бургер","createdAt":"2023-11-13T14:48:18.637Z","updatedAt":"2023-11-13T14:48:18.858Z","number":25999};

    return (
        <div className={styles.global}>
            <h1 className={`${styles.header} text text_type_main-large pb-5`}>
                Лента заказов
            </h1>
            <main className={`${styles.main} `}>
                <section className={`${styles.section1} pb-10 custom-scroll`}>
                    {isLoading && 'Загрузка...'}
                    {Error && 'Произошла ошибка'}
                    {!isLoading &&
                        !Error &&
                        orders !== null &&
                        orders.map((order) => (
                            <Link
                                className={styles.link}
                                key={order.number}
                                to={`/feed/${order.number}`}
                                state={{ background: location }} >
                                <CardOrder key={order._id} order={order} />
                            </Link>
                        )
                        )}
                </section>

                <section className={`${styles.section2} pb-10`}>
                    {isLoading && 'Загрузка...'}
                    {Error && 'Произошла ошибка'}
                    {!isLoading &&
                        !Error &&
                        orders !== null && <Statistics />}

                </section>

            </main>
        </div>
    )
}

export default Feed;