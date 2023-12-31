import HeaderStyles from "./app-header.module.css";
import Nav from './nav/nav';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import { homeRoute, feedRoute, profileRoute } from "../../utils/constants";
import { FC } from "react";

 const AppHeader: FC = () => {
    const location = useLocation();

    return (
        <header className={HeaderStyles.header}>
            <div className={`${HeaderStyles.header_container} pb-4 pt-4`}>
                <div className={HeaderStyles.header_item}>
                    <Nav>
                        <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"} />
                        <NavLink
                            to={homeRoute}
                            className={({ isActive }) =>
                                [
                                    isActive ? `${HeaderStyles.active} text text_type_main-default pl-2` : `${HeaderStyles.inactive} text text_type_main-default pl-2 text_color_inactive`,
                                ].join(" ")
                            }>
                            <span>Конструктор</span>
                        </NavLink>
                    </Nav>
                    <Nav>
                        <BurgerIcon type={location.pathname === '/feed' ? "primary" : "secondary"} />
                        <NavLink
                            to={feedRoute}
                            className={({ isActive }) =>
                                [
                                    isActive ? `${HeaderStyles.active} text text_type_main-default pl-2` : `${HeaderStyles.inactive} text text_type_main-default pl-2 text_color_inactive`,
                                ].join(" ")
                            }>
                            <span>Лента заказов</span>
                        </NavLink>
                    </Nav>
                </div>
                <div className={`${HeaderStyles.header_item} jc-c`}>
                    <div className='mt-2 mb-2'>
                        <Logo />
                    </div>
                </div>
                <div className={`${HeaderStyles.header_item} jc-f-e`}>
                    <Nav>
                        <ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? "primary" : "secondary"} />
                        <NavLink
                            to={profileRoute}
                            className={({ isActive }) =>
                                [
                                    isActive ? `${HeaderStyles.active} text text_type_main-default pl-2` : `${HeaderStyles.inactive} text text_type_main-default pl-2 text_color_inactive`,
                                ].join(" ")
                            }>
                            <span>Личный кабинет</span>
                        </NavLink>
                    </Nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;