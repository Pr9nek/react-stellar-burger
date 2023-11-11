import styles from "./orders.module.css";
import CardOrder from "./card-order/card-order";

export default function Orders() {

    return (
        <div className={`${styles.container} custom-scroll`}>
            <CardOrder />
            <CardOrder />
            <CardOrder />
            <CardOrder />
            <CardOrder />
        </div>
    )
}