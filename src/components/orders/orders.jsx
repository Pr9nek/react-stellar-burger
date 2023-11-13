import styles from "./orders.module.css";
import CardOrder from "./card-order/card-order";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { connect, disconnect } from "../../services/actions/profileFeed/actions";

export default function Orders() {
    const dispatch = useDispatch();
    const { isLoading, Error, orders } = useSelector(store => store.profileFeed);
    // const user = useSelector((store) => store.user.user);

    const token = localStorage.getItem("accessToken");
    const tokenShot = token.split('Bearer ')[1];
    const PROFILE_ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${tokenShot}`;

    useEffect(() => {
        dispatch(connect(`${PROFILE_ORDERS_URL}`));
        return () => {
            dispatch(disconnect(PROFILE_ORDERS_URL));
        }
    }, [dispatch]);


    return (
        <div className={`${styles.container} custom-scroll`}>
            {isLoading && 'Загрузка...'}
                    {Error && 'Произошла ошибка'}
                    {!isLoading &&
                    !Error &&
                    orders !== null && 
                    [...orders].reverse().map((order) => <CardOrder key={order._id} order={order}/>)}
        </div>
    )
}