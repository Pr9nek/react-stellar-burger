import HeaderStyles from "./app-header.module.css";
import Nav from './nav/nav';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

export default function AppHeader() {
    const location = useLocation();

    return (
        <header className={HeaderStyles.header}>
            <div className={`${HeaderStyles.header_container} pb-4 pt-4`}>

                <div className={HeaderStyles.header_item}>
                    <Nav>
                        
                            <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"} />

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                [
                                    isActive ? `${HeaderStyles.active} text text_type_main-default pl-2` : `${HeaderStyles.inactive} text text_type_main-default pl-2 text_color_inactive`,
                                ].join(" ")
                            }>
                            <span>Конструктор</span>
                        </NavLink>
                    </Nav>
                    <Nav>
                       
                            <BurgerIcon type={location.pathname === '/lenta' ? "primary" : "secondary"}/>

                        <NavLink
                            to="/lenta"
                            type={({ isActive }) =>
                                [
                                    isActive ? "primary" : "secondary",
                                ].join(" ")
                            }
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
                       
                            <ProfileIcon type={location.pathname === '/profile' ? "primary" : "secondary"}/>

                        <NavLink
                            to="/profile"
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