import HeaderStyles from "./app-header.module.css";
import Nav from './nav/nav';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return (
        <header className={HeaderStyles.header}>
            <div className={`${HeaderStyles.header_container} pb-4 pt-4`}>
                
                <div className={HeaderStyles.header_item}>
                    <Nav>
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default pl-2">Конструктор</span>
                    </Nav>
                    <Nav>
                        <BurgerIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                    </Nav>
                </div>

                <div className={`${HeaderStyles.header_item} jc-c`}>
                    <div className='mt-2 mb-2'> 
                        <Logo/>
                    </div>
                </div>

                <div className={`${HeaderStyles.header_item} jc-f-e`}>
                    <Nav>
                    <ProfileIcon type="secondary"/>
                    <p className="text text_type_main-default text_color_inactive pl-2 ">Личный кабинет</p>
                    </Nav>
                </div>
            </div>
        </header>
    )
}