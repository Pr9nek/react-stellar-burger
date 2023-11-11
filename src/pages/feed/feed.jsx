import styles from "./feed.module.css";
import Orders from "../../components/orders/orders";
import { useSelector, useDispatch } from 'react-redux';
import Statistics from "../../components/statistics/statistics";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/feed/actions";

function Feed() {
    const dispatch = useDispatch();
    const ORDERS_ALL_URL = "wss://norma.nomoreparties.space/orders/all";
    useEffect(() => {
		dispatch(connect(ORDERS_ALL_URL));
		return () => {
			dispatch(disconnect(ORDERS_ALL_URL));
		}
	}, [dispatch]);

    const { isLoading, Error, orders } = useSelector(store => store.feed);
    const { ingredients } = useSelector(store => store.ingredients);

    return (
        <div className={styles.global}>
            <h1 className={`${styles.header} text text_type_main-large pb-5`}>
                Лента заказов
            </h1>
            <main className={`${styles.main} `}>
                <section className={`${styles.section1} pb-10`}>
                    {isLoading && 'Загрузка...'}
            {Error && 'Произошла ошибка'}
            {!isLoading &&
              !Error &&
              ingredients !==null && orders !== null && <Orders />}
                    
                </section>

                <section className={`${styles.section2} pb-10`}>
                    {/* {isLoading && 'Загрузка...'}
            {Error && 'Произошла ошибка'}
            {!isLoading &&
              !Error &&
              ingredients !== null && <BurgerConstructor />} */}
                    <Statistics />
                </section>

            </main>
        </div>
    )
}

export default Feed;