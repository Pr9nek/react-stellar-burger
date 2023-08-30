import React from 'react';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesNav from './Nav.module.css';

export default function Nav(props) {
    return (
            <a href="#1" className={`${stylesNav.link} ${stylesNav.box} pl-5 pr-5 pb-4 pt-4 {props.class}`}>
                {props.children}
                {/* <p className="text text_type_main-default pl-2">{props.name}</p> */}
            </a>
    )
}