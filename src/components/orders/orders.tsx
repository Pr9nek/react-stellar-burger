import styles from "./orders.module.css";
import CardOrder from "./card-order/card-order";
import { useEffect } from "react";
import { useSelector, useDispatch } from '../../hooks/hooks';
import { connect, disconnect } from "../../services/actions/profileFeed/actions";
import { useLocation, Link } from "react-router-dom";
import { profileRoute, profileOrdersRoute, accessTokenString } from "../../utils/constants";
import { RootState } from "../../services/types";

export default function Orders() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoading, error, orders } = useSelector((store: RootState) => store.profileFeed);

    const token = localStorage.getItem(accessTokenString);
    const tokenShot = token?.split('Bearer ')[1];
    const PROFILE_ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${tokenShot}`;

    useEffect(() => {
        dispatch(connect(`${PROFILE_ORDERS_URL}`));
        return () => {
            dispatch(disconnect(PROFILE_ORDERS_URL));
        }
    }, [dispatch, PROFILE_ORDERS_URL]);

    if (error) {console.log(error);
    }

    return (
        <div className={`${styles.container} custom-scroll`}>
            {isLoading && 'Загрузка...'}
            {error && 'Произошла ошибка'}
            {!isLoading &&
                !error &&
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