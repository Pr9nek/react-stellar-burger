import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";

export default function ProfilePage() {

    return (
        <div className={styles.container}>
            <nav>
                <ul className={styles.listcontainer}>
                    <li className={styles.list}>
                        <NavLink
                            to="/profile"
                            className={({ isActive, isPending, isTransitioning }) =>
                                [
                                    isPending ? `${styles.link} text text_type_main-medium text_color_inactive` : "",
                                    isActive ? `${styles.active} text text_type_main-medium` : `${styles.inactive} text text_type_main-medium text_color_inactive`,
                                    isTransitioning ? "transitioning" : "",
                                ].join(" ")
                            }>
                            <span>Профиль</span>
                        </NavLink>
                    </li>
                    <li className={styles.list}>
                        <NavLink
                            to="/profile/orders"
                            className={({ isActive, isPending, isTransitioning }) =>
                                [
                                    isPending ? "text text_type_main-medium text_color_inactive" : "",
                                    isActive ? `${styles.active} text text_type_main-medium` : `${styles.inactive} text text_type_main-medium text_color_inactive`,
                                    isTransitioning ? "transitioning" : "",
                                ].join(" ")
                            }>
                            <span>История заказов</span>
                        </NavLink>
                    </li>
                    <li className={styles.list}>
                        <NavLink
                            to="/login"
                            className={({ isActive, isPending, isTransitioning }) =>
                                [
                                    isPending ? "text text_type_main-medium text_color_inactive" : "",
                                    isActive ? `${styles.active} text text_type_main-medium` : `${styles.inactive} text text_type_main-medium text_color_inactive`,
                                    isTransitioning ? "transitioning" : "",
                                ].join(" ")
                            }>
                            <span>Выход</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <p className={`${styles.text} mt-20 text text_type_main-default text_color_inactive`}>
                В этом разделе вы можете    
                изменить свои персональные данные
            </p>
        </div>
    )
}