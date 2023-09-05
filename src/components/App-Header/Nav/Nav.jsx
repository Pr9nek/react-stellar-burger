import stylesNav from './Nav.module.css';
import { navPropType } from '../../../utils/prop-types';

export default function Nav(props) {
    return (
            <a href="#1" className={`${stylesNav.link} ${stylesNav.box} pl-5 pr-5 pb-4 pt-4 `}>
                {props.children}
            </a>
    )
}

Nav.propTypes = navPropType;