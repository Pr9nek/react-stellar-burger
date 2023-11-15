import { NavLink, Outlet, useMatch } from "react-router-dom";
import styles from "./profile-page.module.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../services/actions/user/actions";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const refreshToken = localStorage.getItem("refreshToken");
    const dispatch = useDispatch();
    const logOut = (e) => {
        e.preventDefault();
        dispatch(logOutUser(refreshToken));
    }
    console.log(isAuthChecked);
    const isProfileInfo = useMatch("/profile");

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <nav>
                    <ul className={styles.listcontainer}>
                        <li className={styles.list}>
                            {!isProfileInfo ? (
                                <NavLink

                                    to="/profile"
                                    className={`${styles.inactive} text text_type_main-medium text_color_inactive`}

                                >
                                    <span>Профиль</span>
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/profile"
                                    className={`${styles.active} text text_type_main-medium`}

                                >
                                    <span>Профиль</span>
                                </NavLink>
                            )
                            }
                            {/* <NavLink
                                
                                to="/profile"
                                exact
                                className={({ isActive, isPending, isTransitioning }) => 
                                    [
                                        isPending ? "" : "",
                                        isActive ? `${styles.active} text text_type_main-medium` : `${styles.inactive} text text_type_main-medium text_color_inactive`,
                                        isTransitioning ? "" : "",
                                    ].join(" ")
                                }>
                                <span>Профиль</span>
                            </NavLink> */}
                        </li>
                        <li className={styles.list}>
                            <NavLink
                                to="/profile/orders"
                                className={({ isActive, isPending, isTransitioning }) =>
                                    [
                                        isPending ? "" : "",
                                        isActive ? `${styles.active} text text_type_main-medium` : `${styles.inactive} text text_type_main-medium text_color_inactive`,
                                        isTransitioning ? "" : "",
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
                                        isPending ? "" : "",
                                        isActive ? `${styles.active} text text_type_main-medium` : `${styles.inactive} text text_type_main-medium text_color_inactive`,
                                        isTransitioning ? "" : "",
                                    ].join(" ")
                                }
                                onClick={logOut}
                            >
                                <span>Выход</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {isProfileInfo ? (
                    <p className={`${styles.text} mt-20 text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </p>
                ) : (
                    <p className={`${styles.text} mt-20 text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете
                        просмотреть свою историю заказов
                    </p>
                )
                }
            </div>
            <Outlet />
        </div>
    )
}