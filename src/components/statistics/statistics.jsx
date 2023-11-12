import styles from "./statistics.module.css";
import { useSelector } from 'react-redux';

export default function Statistics() {

    const { orders, total, totalToday } = useSelector(store => store.feed);
    const done = orders.filter((i) => i.status === 'done')
    const inwork = orders.filter((i) => i.status !== 'done')
    console.log(orders);
    console.log(inwork);

    return (
        <>
            <div className={styles.status}>
                <div>
                    <p className="text text_type_main-medium pb-6">
                        Готовы:
                    </p>
                    <ul className={styles.listcolor}>
                        {done.map((order, index) => {
                            if (index < 50) {
                                return (
                                    <li className={styles.digit} key={order._id}><p key={order._id} className="text text_type_digits-default">{order.number}</p></li>
                                )
                            }}
                            )}  
                    </ul>
                </div>

                <div>
                    <p className="text text_type_main-medium pb-6">
                        В работе:
                    </p>
                    <ul className={styles.list}>
                    {inwork.map((order, index) => {
                            if (index < 30) {
                                return (
                                    <li className={styles.digit} key={order._id}><p key={order._id} className="text text_type_digits-default">{order.number}</p></li>
                                )
                            }}
                            )}  
                    </ul>
                </div>
            </div>
            <p className="text text_type_main-medium">
                Выполнено за все время:
            </p>
            <p className="text text_type_digits-large pb-15">{total}</p>
            <p className="text text_type_main-medium">
                Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large pb-15">{totalToday}</p>
        </>
    )
}