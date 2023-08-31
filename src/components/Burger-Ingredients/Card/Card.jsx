import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CardStyle from "./card.module.css";

export default function Card(props) {
    
    return (
        <>
        <div className={CardStyle.card}>
            <img alt={props.name} src={props.image} />
            <div className={CardStyle.price}>
                <p className="text text_type_digits-default pr-2 pb-1 pt-1">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default pb-6 ${CardStyle.name}`}>{props.name}</p>
        </div>
        </>
    )
}