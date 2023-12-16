import { ReactNode } from 'react';
import stylesNav from './nav.module.css';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';

interface INav {
    children: ReactNode;
}
const Nav: FC<INav> = (props) => {
    return (
            <div className={`${stylesNav.box} pl-5 pr-5 pb-4 pt-4 `}>
                {props.children}
            </div>
    )
}

export default Nav;
