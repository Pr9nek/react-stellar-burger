import Nav from './Nav/Nav';
import HeaderStyles from "./App-Header.module.css";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
    return (
        <div className={HeaderStyles.global}>
            <div className={`${HeaderStyles.header_container} pb-4 pt-4`}>
                
                <div className={HeaderStyles.left_menu}>
                    <Nav>
                        <BurgerIcon type="primary" />
                        <span className="text text_type_main-default pl-2">Конструктор</span>
                    </Nav>
                    <Nav>
                        <BurgerIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                    </Nav>
                </div>

                <div className='mt-2 mb-2'> 
                    <Logo/>
                </div>   

                <div className={HeaderStyles.right_menu}>
                    <Nav>
                    <ProfileIcon type="secondary"/>
                    <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
                    </Nav>
                </div>
            </div>
        </div>
    )
}