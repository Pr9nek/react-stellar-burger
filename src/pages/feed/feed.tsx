import styles from "./feed.module.css";
import { useSelector, useDispatch } from '../../hooks/hooks';
import Statistics from "../../components/statistics/statistics";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/feed/actions";
import CardOrder from "../../components/orders/card-order/card-order";
import { useLocation, Link } from "react-router-dom";
import { feedRoute } from "../../utils/constants";
import { getFeedSelector } from "../../utils/constants";
import { TOrder } from "../../services/types/data";
import { FC } from "react";

const Feed: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const ORDERS_ALL_URL: string = "wss://norma.nomoreparties.space/orders/all";
    useEffect(() => {
        dispatch(connect(ORDERS_ALL_URL));
        return () => {
            dispatch(disconnect(ORDERS_ALL_URL));
        }
    }, [dispatch]);

    // const getFeedSelector = store => store.feed
    const { isLoading, error, orders } = useSelector(getFeedSelector);

    return (
        <div className={styles.global}>
            <h1 className={`${styles.header} text text_type_main-large pb-5`}>
                Лента заказов
            </h1>
            <main className={`${styles.main} `}>
                <section className={`${styles.section1} pb-10 custom-scroll`}>
                    {isLoading && 'Загрузка...'}
                    {error && 'Произошла ошибка'}
                    {!isLoading &&
                        !error &&
                        orders !== null &&
                        orders.map((order: TOrder) => (
                            <Link
                                className={styles.link}
                                key={order.number}
                                to={`${feedRoute}/${order.number}`}
                                state={{ background: location }} >
                                <CardOrder key={order._id} order={order} />
                            </Link>
                        )
                        )}
                </section>

                <section className={`${styles.section2} pb-10`}>
                    {isLoading && 'Загрузка...'}
                    {error && 'Произошла ошибка'}
                    {!isLoading &&
                        !error &&
                        orders !== null && <Statistics />}

                </section>

            </main>
        </div>
    )
}

export default Feed;