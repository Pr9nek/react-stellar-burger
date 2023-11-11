import styles from "./statistics.module.css";

export default function Statistics() {

    return (
        <>
            <div className={styles.status}>
                <div>
                    <p className="text text_type_main-medium pb-6">
                        Готовы:
                    </p>
                    <ul className={styles.listcolor}>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        {/* <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li> */}
                    </ul>
                </div>

                <div>
                    <p className="text text_type_main-medium pb-6">
                        В работе:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                        <li className={styles.digit}><p className="text text_type_digits-default">1234567890</p></li>
                    </ul>
                </div>
            </div>
            <p className="text text_type_main-medium">
            Выполнено за все время:
            </p>
            <p className="text text_type_digits-large pb-15">28752</p>
            <p className="text text_type_main-medium">
            Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large pb-15">138</p>
        </>
    )
}