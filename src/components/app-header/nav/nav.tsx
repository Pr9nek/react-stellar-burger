import stylesNav from './nav.module.css';
import { navPropType } from '../../../utils/prop-types';
import { NavLink } from 'react-router-dom';

export default function Nav(props) {
    return (
            <div className={`${stylesNav.box} pl-5 pr-5 pb-4 pt-4 `}>
                {props.children}
            </div>
    )
}

Nav.propTypes = navPropType;