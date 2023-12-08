import styles from "./orders.module.css";
import CardOrder from "./card-order/card-order";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { connect, disconnect } from "../../services/actions/profileFeed/actions";
import { useLocation, Link } from "react-router-dom";
import { profileRoute, profileOrdersRoute, accessTokenString } from "../../utils/constants";

export default function Orders() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoading, Error, orders } = useSelector(store => store.profileFeed);

    const token = localStorage.getItem(accessTokenString);
    const tokenShot = token.split('Bearer ')[1];
    const PROFILE_ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${tokenShot}`;

    useEffect(() => {
        dispatch(connect(`${PROFILE_ORDERS_URL}`));
        return () => {
            dispatch(disconnect(PROFILE_ORDERS_URL));
        }
    }, [dispatch]);

    // console.log(orders);

    return (
        <div className={`${styles.container} custom-scroll`}>
            {isLoading && 'Загрузка...'}
            {Error && 'Произошла ошибка'}
            {!isLoading &&
                !Error &&
                orders !== null &&
                [...orders].reverse().map((order) => (
                    <Link
                        className={styles.link}
                        key={order.number}
                        to={`${profileRoute}/${profileOrdersRoute}/${order.number}`}
                        state={{ background: location }} >
                        <CardOrder key={order._id} order={order} />
                    </Link>
                )
                )}
        </div>
    )
}